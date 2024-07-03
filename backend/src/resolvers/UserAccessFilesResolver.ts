import { UserAccessFiles } from "../entities/userAccessFiles";
import { Query, Resolver } from "type-graphql";

@Resolver(UserAccessFiles)
class UserAccessFilesResolver {
  @Query(() => [UserAccessFiles])
  async getAllUserAccessFiles() {
    return await UserAccessFiles.find();
  }
}

export default UserAccessFilesResolver;
