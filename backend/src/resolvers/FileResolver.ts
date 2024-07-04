import { File } from "../entities/file";
import { Query, Resolver } from "type-graphql";

@Resolver(File)
class FileResolver {
  @Query(() => [File])
  async getAllFile() {
    return await File.find();
  }
}

export default FileResolver;
