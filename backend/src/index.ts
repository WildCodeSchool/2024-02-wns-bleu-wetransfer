import "reflect-metadata";
import "dotenv/config";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from "express";
import http from "http";
import cors from "cors";
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
    resolvers: [
      PlanResolver,
      UserResolver,
      ReportResolver,
      UploadResolver,
      VisitorResolver,
      FileResolver,
      UserAccessFileResolver,
      BillingResolver,
    ],
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

      // Check '@Authorized(...)' roles includes the role of user
      if (roles.includes(context.role)) {
        return true;
      } else {
        return false;
      }
    },
  });

  const app = express();
  const httpServer = http.createServer(app);

  const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:7002', 'http://localhost:3000'],
    credentials: true,
  };

  app.use(cors(corsOptions));

  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  
  await server.start();

  app.use(
    '/graphql',
    express.json(),
    expressMiddleware(server, {
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
    }),
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
};

start();
