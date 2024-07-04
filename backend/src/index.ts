import "reflect-metadata";
import "dotenv/config";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import jwt from "jsonwebtoken";
import setCookieParser from "set-cookie-parser";
import { dataSource } from "./config/db";
import PlanResolver from "./resolvers/PlanResolver";
import ReportResolver from "./resolvers/ReportResolver";
import UploadResolver from "./resolvers/UploadResolver";
import VisitorResolver from "./resolvers/VisitorResolver";
import UserResolver from "./resolvers/UserResolver";
import FileResolver from "./resolvers/FileResolver";
import UserAccessFileResolver from "./resolvers/UserAccessFileResolver";
import BillingResolver from "./resolvers/BillingResolver";

export type Context = {
  id: number;
  email: string;
  role: string;
};

export default UserResolver;

const start = async () => {
  await dataSource.initialize();
  const schema = await buildSchema({
    resolvers: [PlanResolver, UserResolver, ReportResolver, UploadResolver, VisitorResolver, FileResolver, UserAccessFileResolver, BillingResolver],
    authChecker: ({ context }: { context: Context }, roles) => {
      console.log("roles for this query/mutation ", roles);
      // Check user
      if (!context.email) {
        // No user, restrict access
        return false;
      }

      // Check '@Authorized()'
      if (roles.length === 0) {
        // Only authentication required
        return true;
      }

      // Check '@Authorized(...)' roles inclues the role of user
      if (roles.includes(context.role)) {
        return true;
      } else {
        return false;
      }
    },
  });

  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => {
      if (process.env.JWT_SECRET_KEY === undefined) {
        throw new Error("NO JWT SECRET KEY CONFIGURED");
      }
      const cookies = setCookieParser.parse(req.headers.cookie ?? "", {
        map: true,
      });

      if (cookies.token && cookies.token.value) {
        const payload = jwt.verify(
          cookies.token.value,
          process.env.JWT_SECRET_KEY
        ) as jwt.JwtPayload;
        if (payload) {
          return { ...payload, res: res };
        }
      }
      return { res: res };
    },
  });

  console.log(`🚀  Server ready at: ${url}`);
};

start();
