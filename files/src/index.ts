import express from "express";
import cors from "cors";
import router from "./router";

const app = express();
const port = 3000;


app.options("*", cors({
	origin: ["http://localhost:7002", "http://localhost:3000", "http://localhost:5173"],
	optionsSuccessStatus: 200,
	methods: ["POST", "GET", "DELETE", "PUT"],
	credentials: true
}));

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "http://localhost:5173");
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	res.header("Access-Control-Allow-Credentials", "true");
	next();
});


app.get("/", (req, res) => {
	res.send("Healthcheck Okay");
});

app.use('/files', router)

app.listen(port, () => {
	console.log(`File upload service listening at http://localhost:${port}`);
});
