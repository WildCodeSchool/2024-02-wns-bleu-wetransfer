import { Users } from "../entities/users";
import { Query, Resolver } from "type-graphql";

@Resolver(Users)
class UsersResolver {
  @Query(() => [Users])
  async getAllUsers() {
    return await Users.find();
  }
}

export default UsersResolver;
