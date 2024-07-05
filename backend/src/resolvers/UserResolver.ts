import { User } from "../entities/user";
import { Query, Resolver, Mutation, Arg } from "type-graphql";
import argon2 from "argon2";

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
    if (password !== confirmPassword) {
      throw new Error("Password does not match");
    }

    const findUser = await User.findOne({ where: { email } });

    if (findUser) {
      throw new Error("You cannot sign up with this email");
    }

    password = await argon2.hash(password);

    const createdUser = await User.create({
      firstname,
      lastname,
      email,
      password,
    }).save();

    console.log("user created:", createdUser)

    return "You have successfully signed up!"
  }
}

export default UserResolver;