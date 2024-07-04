import { User } from "../entities/user";
import { Query, Resolver, Mutation, Arg } from "type-graphql";

@Resolver(User)
class UserResolver {
  @Query(() => [User])
  async getAllUser() {
    return await User.find();
  }

  @Mutation(() => User)
  async signUpUser(
    @Arg("firstname") firstname: string,
    @Arg("lastname") lastname: string,
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("confirmPassword") confirmPassword: string
  ) {
    if (password !== confirmPassword) {
      throw new Error("Password does not match");
    }
    return await User.create({
      firstname,
      lastname,
      email,
      password,
    }).save();
  }
}

export default UserResolver;