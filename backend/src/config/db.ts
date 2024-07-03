import { Visitors } from "../entities/visitors";
import { Plans } from "../entities/plans";
import { Billing } from "../entities/billing";
import { FilesToken } from "../entities/filesToken";
import { Files } from "../entities/files";
import { Users } from "../entities/users";
import { DataSource } from "typeorm";

export const dataSource = new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: "postgres",
  password: "example",
  database: "postgres",
  synchronize: true,
  logging: ["error", "query"],
  entities: [Plans, Visitors, Billing, FilesToken, Files, Users],
});
