import { Upload } from "../entities/upload";
import { Field, InputType, Query, Resolver } from "type-graphql";
import { FileInput } from "./FileResolver";

@InputType()
export class UploadInput {
	@Field()
	senderEmail: string;

	@Field(() => [FileInput])
	files: FileInput[];

	@Field()
	token: string;

	@Field(() => [String])
	receiverEmails: string[];
}

@Resolver(Upload)
class UploadResolver {
	@Query(() => [Upload])
	async getAllUpload() {
		return await Upload.find();
	}
}

export default UploadResolver;
