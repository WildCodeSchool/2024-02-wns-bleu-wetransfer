import { FilesToken } from "../entities/filesToken";
import { Query, Resolver } from "type-graphql";

@Resolver(FilesToken)
class FilesTokenResolver {
  @Query(() => [FilesToken])
  async getAllFilesToken() {
    return await FilesToken.find();
  }
}

export default FilesTokenResolver;
