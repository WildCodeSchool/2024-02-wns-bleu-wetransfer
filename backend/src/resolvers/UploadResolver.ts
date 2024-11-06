import { Upload } from "../entities/upload";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Visitor } from "../entities/visitor";
import { User } from "../entities/user";
import { File } from "../entities/file";
import { createDownloadToken, generateDownloadLink } from "../helpers/linkGenerator";

@Resolver(Upload)
class UploadResolver {
	@Query(() => [Upload])
	async getAllUpload() {
		return await Upload.find();
	}

	@Query(() => [Upload])
	async getUploadsByUserId(@Arg("userId") userId: number) {
		const user = await User.findOneByOrFail({ id: userId });

		if (!user) {
			throw new Error("User not found");
		}

		try {
			const result = await Upload.find({
				where: { user: { id: userId } },
				relations: ["files"],
			});		

			return result;
		} catch (err) {
			throw new Error("Internal server error");
		}
	}

	@Mutation(() => String)
	async createUpload(
		@Arg("receiversEmails", () => [String]) receivers: string[],
		@Arg("senderEmail", () => String) senderEmail: string,
		@Arg("message", () => String) message: string,
		@Arg("title", () => String) title: string,
		@Arg("fileData", () => String) fileData: string
	): Promise<string> {
		try {
			const user = await userOrVisitor(senderEmail);

			const uploadFiles: File[] = [];
			const parsedFiles = JSON.parse(fileData);

			for (const file of parsedFiles) {
				const newFile = await File.create({
				name: file.original_name,
				size: file.size,
				default_name: file.default_name,
				type: file.mimetype,
				path: file.path,
				file_uid: file.uuid,
				}).save();

				uploadFiles.push(newFile);
			}

			const newUpload = await Upload.create({
				receivers,
				message,
				title,
				user,
				files: uploadFiles,
			}).save();

			if (newUpload) {
				const downloadToken = createDownloadToken(
				{
					uploadId: newUpload.id,
					receivers,
					senderEmail: user.email,
				},
				"1h"
				);

				const downloadLink: string = generateDownloadLink(downloadToken);

				return downloadLink;
			}

			throw new Error("Failed to create upload");
		} catch (err) {
			throw new Error("Internal server error");
		}
	}
}

const userOrVisitor = async (email: string): Promise<User | Visitor> => {
    let user: User | null = await User.findOneBy({ email });
    if (user) return user;

    let visitor: Visitor | null = await Visitor.findOneBy({ email });
    if (!visitor) {
        visitor = await Visitor.create({ email }).save();
    }

    return visitor;
};

export default UploadResolver;