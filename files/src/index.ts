import express from "express";
import cors from "cors";
import router from "./router";

const app = express();
const port = 3000;

app.use(cors({
	origin: ["http://localhost:7002", "http://localhost:3000", "http://localhost:5173", "http://localhost:4000"],
	credentials: true,
	methods: ["POST", "GET", "DELETE", "PUT", "OPTIONS"],
	allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"]
}));


app.get("/", (req, res) => {
	res.send("Healthcheck Okay");
});

app.use('/files', router)

app.listen(port, () => {
	console.log(`File upload service listening at http://localhost:${port}`);
});
