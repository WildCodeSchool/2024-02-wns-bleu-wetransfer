import { User } from "../entities/user";
import { Query, Resolver, Mutation, Arg } from "type-graphql";

@Resolver(User)
class UserResolver {
  @Query(() => [User])
  async getAllUser() {
    return await User.find();
  }

  @Mutation(() => String)
  async signUpUser(
    @Arg("firstname") firstname: string,
    @Arg("lastname") lastname: string,
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("confirmPassword") confirmPassword: string
  ) {
    console.log("mutating.......")
    if (password !== confirmPassword) {
      console.log("received:")
      console.log("password:", password)
      console.log("confirmPassword", confirmPassword)
      throw new Error("Password does not match");
    }
    await User.create({
      firstname,
      lastname,
      email,
      password,
    }).save();

    return "ok"
  }
}

export default UserResolver;