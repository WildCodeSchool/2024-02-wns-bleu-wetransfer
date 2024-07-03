import { Files } from "../entities/files";
import { Query, Resolver } from "type-graphql";

@Resolver(Files)
class FilesResolver {
  @Query(() => [Files])
  async getAllFiles() {
    return await Files.find();
  }
}

export default FilesResolver;
