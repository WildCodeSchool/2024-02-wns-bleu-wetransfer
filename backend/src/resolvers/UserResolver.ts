import { User } from "../entities/user";
import { Query, Resolver } from "type-graphql";

@Resolver(User)
class UserResolver {
  @Query(() => [User])
  async getAllUser() {
    return await User.find();
  }
}

export default UserResolver;
