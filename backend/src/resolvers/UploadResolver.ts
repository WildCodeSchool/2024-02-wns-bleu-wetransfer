import {Upload} from "../entities/upload";
import {Arg, Authorized, Ctx, Mutation, Query, Resolver} from "type-graphql";
import {Visitor} from "../entities/visitor";
import {User} from "../entities/user";
import {File} from "../entities/file";
import {createDownloadToken, generateDownloadLink,} from "../helpers/linkGenerator";
import jwt from "jsonwebtoken";
import {Context} from "../index";

@Resolver(Upload)
class UploadResolver {
	@Query(() => [Upload])
	async getAllUpload() {
		return await Upload.find();
	}

	@Query(() => [Upload])
	async getUploadsByUserId(@Ctx() context: Context) {
		try {
			//@ts-ignore
			return await Upload.find({
				where: {user: {id: context.id}},
				relations: ["files"],
			});
		} catch (err) {
			throw new Error("Internal server error");
		}
	}

	@Authorized()
	@Mutation(() => String)
	async changeUploadActivatedStatus(@Arg("uploadId") uploadId: number) {
		const upload = await Upload.findOneByOrFail({id: uploadId});

		if (!upload) {
			throw new Error("Upload not found");
		}

		upload.is_activated = !upload.is_activated;

		try {
			await upload.save();
			return `Upload ${upload.is_activated ? "activated" : "deactivated"}`;
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

			if (!user) {
				throw new Error("User not found");
			}

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

			const newUpload = Upload.create({
				receivers,
				message,
				title,
				files: uploadFiles,
			});

			if (user instanceof User) newUpload.user = user;
			if (user instanceof Visitor) newUpload.visitor = user;

			await newUpload.save();

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

	@Mutation(() => [File])
	async getFilesFromUpload(
		@Arg("token", () => String) token: string
	): Promise<File[]> {
		// Décoder le token pour récupérer upload id
		// Initie fonction pour chercher les files en relation avec cet upload
		// Envoyer les files

		try {
			if (!process.env.JWT_SECRET_KEY) {
				throw new Error(
					"JWT_SECRET_KEY is not defined in environment variables"
				);
			}

			const payload = jwt.verify(
				token,
				process.env.JWT_SECRET_KEY as string
			) as jwt.JwtPayload;

			const uploadId = payload.uploadId;
			if (!uploadId) {
				throw new Error("Invalid token: uploadId not found");
			}
			console.log(uploadId);

			const upload = await Upload.findOne({
				where: {id: uploadId},
				relations: ["files"],
			});

			if (!upload || !upload.files) {
				throw new Error("No files found for this upload");
			}
			console.log(uploadId);

			return upload.files;
		} catch (err: unknown) {
			console.error("Error retrieving files from upload:", err);

			if (err instanceof Error) {
				throw new Error("Invalid or expired token: " + err.message);
			}

			throw new Error("An unknown error occurred");
		}
	}
}

const userOrVisitor = async (email: string): Promise<User | Visitor> => {
	const user: User | null = await User.findOneBy({email});
	if (user) return user;

	let visitor: Visitor | null = await Visitor.findOneBy({email});

	if (!visitor) {
		visitor = await Visitor.create({email}).save();
	}

	return visitor;
};

export default UploadResolver;
