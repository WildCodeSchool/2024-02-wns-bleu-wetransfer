import { Upload } from "../entities/upload";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Visitor } from "../entities/visitor";
import { File } from "../entities/file";
import { createDownloadToken, generateDownloadLink } from "../helpers/linkGenerator";

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
    @Arg("fileData", () => String) fileData: string
  ): Promise<string> {
    try {
      let visitor = await Visitor.findOneBy({ email: senderEmail });

      if (!visitor) {
        visitor = await Visitor.create({ email: senderEmail }).save();
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

      console.log("Uploaded files:", uploadFiles);

      const newUpload = await Upload.create({
        receivers,
        message,
        title,
        visitor,
        files: uploadFiles,
      }).save();

      if (newUpload) {
        const downloadToken = createDownloadToken(
          {
            uploadId: newUpload.id,
            receivers,
            senderEmail: visitor.email,
          },
          "1h"
        );

        const downloadLink: string = generateDownloadLink(downloadToken);

        console.log("downloadlink=====>", downloadLink);

        return downloadLink;
      }

      throw new Error("Failed to create upload");
    } catch (err) {
      console.error("Internal server error during Upload Creation:", err);
      throw new Error("Internal server error");
    }
  }
}

export default UploadResolver;