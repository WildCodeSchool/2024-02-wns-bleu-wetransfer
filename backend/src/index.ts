import "reflect-metadata";
import {buildSchema} from "type-graphql";
import {ApolloServer} from "@apollo/server";
import {ApolloServerPluginDrainHttpServer} from '@apollo/server/plugin/drainHttpServer';
import express from "express";
import http from "http";
import cors from "cors";
import jwt from "jsonwebtoken";
import {dataSource} from "./config/db";
import PlanResolver from "./resolvers/PlanResolver";
import ReportResolver from "./resolvers/ReportResolver";
import UploadResolver from "./resolvers/UploadResolver";
import VisitorResolver from "./resolvers/VisitorResolver";
import UserResolver from "./resolvers/UserResolver";
import FileResolver from "./resolvers/FileResolver";
import BillingResolver from "./resolvers/BillingResolver";
import {startStandaloneServer} from "@apollo/server/standalone";
import cookie from 'cookie'
import path from "path";
import dotenv from 'dotenv'
import { createClient } from "redis";

export const redisClient = createClient({ url: "redis://redis" });

redisClient.on("error", (err) => {
  console.log("Redis Client Error", err);
});
redisClient.on("connect", () => {
  console.log("redis connected");
});

dotenv.config({path: path.join(__dirname, '../../.env')})

export type Context = {
	id: number;
	email: string;
	role: string;
	planId: number
};


const start = async () => {
	await redisClient.connect();
	await dataSource.initialize()
		.then(() => {
			console.log('Data Source has been initialized!');
		})
		.catch((err) => {
			console.error('Error during Data Source initialization', err);
		});

	const schema = await buildSchema({
		resolvers: [
			PlanResolver,
			UserResolver,
			ReportResolver,
			UploadResolver,
			VisitorResolver,
			FileResolver,
			BillingResolver,
		],


		authChecker: ({context}: { context: Context }, roles) => {
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

	app.use(cors({
		origin: ["http://localhost:7002", "http://localhost:3000", "http://localhost:5173"],
		credentials: true,
		methods: ["POST", "GET", "DELETE", "PUT", "OPTIONS"],
		allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"]
	}));

	const server = new ApolloServer({
		schema,
		plugins: [ApolloServerPluginDrainHttpServer({httpServer})],
	});

	const {url} = await startStandaloneServer(server, {
		listen: {port: 4000},
		context: async ({req, res}) => {
			if (process.env.JWT_SECRET_KEY === undefined) {
				throw new Error("NO JWT SECRET KEY CONFIGURED");
			}
			const cookies = cookie.parse(req.headers.cookie ?? "");

			if (cookies.token) {
				try {
					const payload = jwt.verify(cookies.token, process.env.JWT_SECRET_KEY) as jwt.JwtPayload;

					if (payload) {
						return {...payload, res};
					}
				} catch (err) {
					console.error("Invalid token:", err.message);
				}
			}
			return {res};
		},
	})

	await new UserResolver().initUserE2E();
	console.log(`🚀 Server ready at ${url}`);
};

start();
