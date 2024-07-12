import { File } from "../entities/file";
import { Arg, InputType, Mutation, Query, Resolver, Field } from "type-graphql";
import { Visitor } from "../entities/visitor";
import { Upload } from "../entities/upload";
import { dataSource } from "../config/db";
import { UploadInput } from "./UploadResolver";

type FileType = {
	filename: string;
	mimetype: string;
	path: string;
	size: number;
};

@InputType()
export class FileInput {
	@Field()
	filename: string;

	@Field()
	mimetype: string;

	@Field()
	path: string;

	@Field()
	size: number;
}

@Resolver(File)
class FileResolver {
	@Query(() => [File])
	async getAllFile() {
		return await File.find();
	}

	@Mutation(() => Boolean)
	async uploadFiles(@Arg("upload") upload: UploadInput): Promise<boolean> {
		return await dataSource
			.transaction(async (transactionalEntityManager) => {
				let visitor = await transactionalEntityManager.findOne(
					Visitor,
					{ where: { email: upload.senderEmail } }
				);

				if (!visitor) {
					visitor = transactionalEntityManager.create(Visitor, {
						email: upload.senderEmail,
					});
					await transactionalEntityManager.save(visitor);
				}

				const fileEntries = upload.files.map((file: FileType) =>
					transactionalEntityManager.create(File, {
						default_name: file.filename,
						mimetype: file.mimetype,
						path: file.path,
						size: file.size,
					})
				);

				await transactionalEntityManager.save(fileEntries);

				const newUpload = transactionalEntityManager.create(Upload, {
					download_link: upload.token,
					receivers: upload.receiverEmails,
					visitor,
					files: fileEntries,
				});

				await transactionalEntityManager.save(newUpload);

				for (let file of fileEntries) {
					file.upload = newUpload;
				}
				await transactionalEntityManager.save(fileEntries);

				return true;
			})
			.catch((error) => {
				console.error("Error uploading files:", error);
				return false;
			});
	}
}

export default FileResolver;
