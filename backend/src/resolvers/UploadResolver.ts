import { Upload } from "../entities/upload";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Visitor } from "../entities/visitor";
import { File } from "../entities/file";
import {
  createDownloadToken,
  generateDownloadLink,
} from "../helpers/linkGenerator";
import jwt from "jsonwebtoken";

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
    @Arg("filePath", () => String) filePath: string
  ): Promise<string> {
    try {
      let visitor = await Visitor.findOneBy({ email: senderEmail });

      if (!visitor) {
        visitor = await Visitor.create({
          email: senderEmail,
        }).save();
      }

      const { filename, size, mimetype, uid } = JSON.parse(fileData);

      console.log("fileData", fileData);

      const newFile = await File.create({
        name: filename,
        size,
        type: mimetype,
        file_uid: uid,
        path: filePath,
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
          const downloadToken = createDownloadToken(
            {
              uploadId: newUpload.id,
              receivers,
              senderEmail: visitor.email,
            },
            "1h"
          );

          const downloadLink: string = generateDownloadLink(downloadToken);

          console.log(downloadLink);

          return downloadLink;
        }
      }
      throw new Error("Failed to create upload");
    } catch (err) {
      console.error("Internal server error during Upload Creation:", err);
      throw new Error("Internal server error");
    }
  }

  @Mutation(() => String)
  async getFilesFromUpload(
    @Arg("token", () => String) token: string
  ): Promise<string> {
    /**
     * Décoder le token pour récupérer upload id
     * Nvlle fonction pour chercher les files en relation avec cet upload
     * Envoyer les files
     */
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY
    ) as jwt.JwtPayload;
  }
}

export default UploadResolver;
