import {Visitor} from "../entities/visitor";
import {Plan} from "../entities/plan";
import {Billing} from "../entities/billing";
import {Upload} from "../entities/upload";
import {File} from "../entities/file";
import {User} from "../entities/user";
import {Report} from "../entities/report";
import {UserAccessFile} from "../entities/userAccessFile";
import {DataSource} from "typeorm";

export const dataSource = new DataSource({
	type: "postgres",
	host: "db",
	port: 5432,
	username: "postgres",
	password: "postgres",
	database: "wild-transfer",
	synchronize: true,
	logging: ["error", "query", "schema"],
	entities: [
		Plan,
		Visitor,
		Billing,
		Upload,
		File,
		User,
		Report,
		UserAccessFile,
	],
});
