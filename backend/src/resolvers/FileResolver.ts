import { File } from "../entities/file";
import { Authorized, Query, Resolver } from "type-graphql";
import { Arg, Mutation } from "type-graphql";
import axios from "axios";
import { StatusOption } from "../entities/file";

@Resolver(File)
class FileResolver {
  @Query(() => [File])
  async getAllFile() {
    return await File.find();
  }

  @Authorized()
  @Mutation(() => Boolean)
  async deleteFile(@Arg("id") id: number) {
    try {
      const file = await File.findOneByOrFail({ id });

      if (!file) {
        throw new Error("File not found");
      }

      const response = await axios.delete(
        `http://files:3000/files/delete?filename=${file.default_name}`
      );

      if (response.status !== 200) {
        throw new Error("Internal server error during file deletion 1");
      }

      await File.delete({ id });

      return true;
    } catch (err) {
      throw new Error("Internal server error during file deletion 2");
    }
  }

  @Authorized()
  @Mutation(() => Boolean)
  async editFileName(
    @Arg("id") id: number,
    @Arg("newName") newName: string
  ) {
    try {
      const file = await File.findOneByOrFail({ id });

      if (!file) {
        throw new Error("File not found");
      }

      file.name = newName;

      await file.save();

      return true;
    } catch (err) {
      throw new Error("Internal server error during file name edit");
    }
  }

  @Authorized()
  @Mutation(() => String)
  async changePrivacyStatus(
    @Arg("id") id: number,
    @Arg("status") status: string
  ) {
    try {
      const file = await File.findOneByOrFail({ id });

      if (!file) {
        throw new Error("File not found");
      }

      if (!Object.values(StatusOption).includes(status as StatusOption)) {
        throw new Error("Invalid status option");
      }

      file.privacy_status = status as StatusOption;

      await file.save();

      return true;
    } catch (err) {
      throw new Error("Internal server error during file privacy status");
    }
  }
}

export default FileResolver;
