import { DataSource } from "typeorm";

const isDevelopment = process.env.NODE_ENV === "development";

export const dataSource = new DataSource({
	type: "postgres",
	host: "db",
	port: 5432,
	username: "postgres",
	password: "postgres",
	database: "wild-transfer",
	synchronize: false,
	migrations: [isDevelopment ? "migrations/*.ts" : "dist/migrations/*.js"],
	migrationsTableName: "migrations",
	logging: ["error", "query", "schema"],
	entities: [
		isDevelopment ? "src/entities/*.ts" : "dist/entities/*.js"
	],
});
