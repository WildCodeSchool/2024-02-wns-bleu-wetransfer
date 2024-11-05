import {User, UserInfo} from "../entities/user";
import {visitorUtils} from "./VisitorResolver";
import {Arg, AuthenticationError, Ctx, Mutation, Query, Resolver} from "type-graphql";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import {EntityNotFoundError} from "typeorm";
import {Context} from "../index";
import cookie from 'cookie'

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
		@Arg("confirmPassword") confirmPassword: string,
	) {
		if (password !== confirmPassword) {
			throw new Error("Passwords does not match");
		}

		password = await argon2.hash(password);

		const findUser = await User.findOne({where: {email}});

		if (findUser) {
			throw new Error("You cannot sign up with this email");
		}

		const visitor = await visitorUtils.getVisitorByEmail(email);

		if (visitor) {
			convertVisitorIntoUser(visitor, firstname, lastname, email, password);
			return "You have successfully signed up!"
		}

		try {
			await User.create({
				firstname,
				lastname,
				email,
				password,
			}).save();
		} catch (err) {
			throw new Error("Internal server error during sign up");
		}

		return "You have successfully signed up!"
	}

	@Mutation(() => String)
	async login(
		@Arg("email") emailFromClient: string,
		@Arg("password") passwordFromClient: string,
		@Ctx() context: any
	) {
		try {
			if (process.env.JWT_SECRET_KEY === undefined) {
				return new Error('Internal Server Error')
			}

			const userFromDB = await User.findOneByOrFail({email: emailFromClient});

			const isPasswordCorrect = await argon2.verify(
				userFromDB.password,
				passwordFromClient
			);

			if (!isPasswordCorrect) {
				throw new AuthenticationError("Wrong credentials");
			}

			const token = jwt.sign(
				{id: userFromDB.id, email: userFromDB.email, role: userFromDB.role},
				process.env.JWT_SECRET_KEY,
				{expiresIn: '1h'}
			);

			const serializedCookie = cookie.serialize("token", token, {
				httpOnly: true,
				sameSite: "strict",
				maxAge: 3600,
				path: "/",
			});

			context.res.setHeader("Set-Cookie", serializedCookie);
			return "Login accepted";

		} catch (err) {
			if (err instanceof EntityNotFoundError || err instanceof AuthenticationError) {
				throw new AuthenticationError("Wrong credentials");
			}

			console.error("Internal server error during login:", err);
			throw new Error("Internal server error");
		}
	}

	@Mutation(() => String)
	async logout(@Ctx() context: any) {
		context.res.setHeader("Set-Cookie", cookie.serialize("token", ""));
		return "Logged out";
	}

	@Query(() => UserInfo)
	async getConnectedUser(@Ctx() context: Context): Promise<UserInfo> {

		const user: User | null = await User.findOneBy({id: context.id});

		if (user) {
			return {
				email: user.email,
				role: user.role,
				firstname: user.firstname,
				lastname: user.lastname,
				isLoggedIn: true,
			};
		}
		return {
			email: "",
			role: "",
			firstname: "",
			lastname: "",
			isLoggedIn: false,
		}
	}
}

const convertVisitorIntoUser = async (visitor: any, firstname: string, lastname: string, email: string, password: string) => {
	const createdUser: User = User.create({
		firstname,
		lastname,
		email,
		password,
	})

	try {
		const visitorUploads = await visitorUtils.getUploads(visitor.id);

		if (visitorUploads && visitorUploads.uploads.length > 0) {
			createdUser.uploads = visitorUploads.uploads;	
		}

		await createdUser.save();
		await visitorUtils.deleteVisitor(visitor, createdUser);
	} catch (err) {
		throw new Error("Internal server error during Visitor to User conversion");
	} 
}

export default UserResolver;