import {DataSource} from "typeorm";

export const dataSource = new DataSource({
	type: "postgres",
	host: "db",
	port: 5432,
	username: "postgres",
	password: "postgres",
	database: "wild-transfer",
	synchronize: false,
	migrations: ["migrations/*.ts"],
	migrationsTableName: "migrations",
	logging: ["error", "query", "schema"],
	entities: [process.env.PROJECT_STATUS === 'DEV' ? "src/entities/*.ts" : "dist/entities/*.js"],
});