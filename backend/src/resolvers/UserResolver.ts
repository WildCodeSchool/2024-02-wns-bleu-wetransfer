import {User} from "../entities/user";
import {Arg, Ctx, Mutation, Query, Resolver} from "type-graphql";
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
			throw new Error("Passwords does not match");
		}

		const findUser = await User.findOne({where: {email}});

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

	@Query(() => String)
	async login(
		@Arg("email") emailFromClient: string,
		@Arg("password") passwordFromClient: string,
		@Ctx() context: any
	) {
		try {
			if (process.env.JWT_SECRET_KEY === undefined) {
				throw new Error("NO JWT SECRET KEY DEFINED");
			}
			const userFromDB = await User.findOneByOrFail({email: emailFromClient});
			console.log("UserFromDB", userFromDB);
			const isPasswordCorrect = await argon2.verify(
				userFromDB.hashedPassword,
				passwordFromClient
			);
			console.log("is password correct", isPasswordCorrect);
			if (isPasswordCorrect) {
				const token = jwt.sign(
					{id: userFromDB.id, email: userFromDB.email, role: userFromDB.role},
					process.env.JWT_SECRET_KEY
				);
				context.res.setHeader("Set-Cookie", `token=${token}; Secure; HttpOnly`);
				return "Login accepted";
			} else {
				throw new Error("Bad Login");
			}
		} catch (err) {
			console.log(err);
			throw new Error("Bad Login");
		}
	}
}

export default UserResolver;