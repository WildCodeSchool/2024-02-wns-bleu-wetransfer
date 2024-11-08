import { File } from "../entities/file";
import { Query, Resolver } from "type-graphql";
import { Arg, Mutation } from "type-graphql";
import axios from "axios";
import {User} from "../entities/user";
import {dataSource} from "../config/db";
import { StatusOption } from "../entities/file";


@Resolver(File)
class FileResolver {
	@Query(() => [File])
	async getAllFile() {
		return await File.find();
	}


	@Query(() => [File])
	async getUserAccessSharedFiles(@Arg('userId') userId: number) {

		return await File.createQueryBuilder("file")
			.leftJoin("file.users_with_access", "user")
			.where("user.id = :userId", {userId})
			.getMany()

	}

	@Mutation(() => Boolean)
	async deleteFile(@Arg("id") id: number) {
		try {
			const file = await File.findOneByOrFail({id});

			if (!file) {
				throw new Error("File not found");
			}

			const response = await axios.delete(
				`http://files:3000/files/delete?filename=${file.default_name}`
			);

			if (response.status !== 200) {
				throw new Error("Internal server error during file deletion 1");
			}

			await File.delete({id});

			return true;
		} catch (err) {
			throw new Error("Internal server error during file deletion 2");
		}
	}

	@Mutation(() => Boolean)
	async editFileName(
		@Arg("id") id: number,
		@Arg("newName") newName: string
	) {
		try {
			const file = await File.findOneByOrFail({id});

			if (!file) {
				throw new Error("File not found");
			}

			file.name = newName;

			await file.save();

			return true;
		} catch (err) {
			throw new Error("Internal server error during file name edit");
		}
	}

	@Mutation(() => Boolean)
	async addFilesAccessUsers(
		@Arg("filesId", () => [Number]) filesId: number[],
		@Arg("usersToShareTo", () => [String]) usersToShareTo: string[]
	) {
		return await dataSource.transaction(async (transactionalEntityManager) => {
			try {

				const users = await transactionalEntityManager
					.createQueryBuilder(User, "user")
					.where("user.email IN (:...emails)", {emails: usersToShareTo})
					.getMany();

				const files = await transactionalEntityManager
					.createQueryBuilder(File, "file")
					.leftJoinAndSelect('file.users_with_access', 'users')
					.where("file.id IN (:...ids)", {ids: filesId})
					.getMany();

				if (users.length !== usersToShareTo.length) {
					throw new Error("Some users could not be found.");
				}
				if (files.length !== filesId.length) {
					throw new Error("Some files could not be found.");
				}

				for (const file of files) {
					file.users_with_access = [...file.users_with_access, ...users];
				}

				await transactionalEntityManager.save(files);

				return true;
			} catch (error) {
				throw new Error(`Internal server error during access grant to users: ${error.message}`);
			}
		});
	}

	@Mutation(() => String)
	async changePrivacyStatus(
		@Arg("id") id: number,
		@Arg("status") status: string
	) {
		try {
			const file = await File.findOneByOrFail({id});

			if (!file) {
				throw new Error("File not found");
			}

			if (!Object.values(StatusOption).includes(status as StatusOption)) {
				throw new Error("Invalid status option");
			}

			file.privacy_status = status as StatusOption;

			await file.save();

			return true;
		} catch (err) {
			throw new Error("Internal server error during file privacy status");
		}
	}
}

export default FileResolver;
