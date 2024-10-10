import {Upload} from "../entities/upload";
import {Arg, Mutation, Query, Resolver} from "type-graphql";
import {Visitor} from "../entities/visitor";
import {File} from "../entities/file";
import {createDownloadToken, generateDownloadLink} from "../helpers/linkGenerator";

@Resolver(Upload)
class UploadResolver {
	@Query(() => [Upload])
	async getAllUpload() {
		return await Upload.find();
	}

	@Mutation(() => String)
	async createUpload(
		@Arg("receiversEmails", () => [String]) receivers: string[],
		@Arg("senderEmail", () => String) senderEmail: string,
		@Arg("message", () => String) message: string,
		@Arg("title", () => String) title: string,
		@Arg("fileData", () => String) fileData: any,
		@Arg("file_path", () => String) filePath: string,
	): Promise<string> {
		try {
			let visitor = await Visitor.findOneBy({email: senderEmail});

			if (!visitor) {
				visitor = await Visitor.create({
					email: senderEmail
				}).save();
			}

			const {name, size, type, uid} = fileData;

			const newFile = await File.create({
				name,
				size,
				type,
				file_uid: uid,
				path: filePath
			}).save();

			if (newFile) {
				const newUpload = await Upload.create({
					receivers,
					message,
					title,
					visitor,
					files: [newFile],
				}).save();

				if (newUpload) {
					const downloadToken = createDownloadToken({
						uploadId: newUpload.id,
						receivers,
						senderEmail: visitor.email
					}, '1h');


					const dowloadLink: string = generateDownloadLink(downloadToken);

					return dowloadLink;
				}
			}
			throw new Error("Failed to create upload");
		} catch (err) {
			console.error("Internal server error during Upload Creation:", err);
			throw new Error("Internal server error");
		}
	}
}

export default UploadResolver;
