import { UserAccessFile } from "../entities/userAccessFile";
import { Query, Resolver } from "type-graphql";

@Resolver(UserAccessFile)
class UserAccessFileResolver {
  @Query(() => [UserAccessFile])
  async getAllUserAccessFile() {
    return await UserAccessFile.find();
  }
}

export default UserAccessFileResolver;
