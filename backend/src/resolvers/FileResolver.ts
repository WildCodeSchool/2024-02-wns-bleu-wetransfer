import { File } from "../entities/file";
import { Query, Resolver } from "type-graphql";
import { Arg, Mutation } from "type-graphql";
import axios from "axios";

@Resolver(File)
class FileResolver {
  @Query(() => [File])
  async getAllFile() {
    return await File.find();
  }

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
        console.log("NOT FOUND")
        throw new Error("Internal server error during file deletion 1");
      }

      await File.delete({ id });

      return true;
    } catch (err) {
      throw new Error("Internal server error during file deletion 2");
    }
  }
}

export default FileResolver;
