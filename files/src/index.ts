import 'dotenv/config'
import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import {signToken} from "./jwtHelper";

console.log('process.env', process.env.JWT_SECRET_KEY)

// Initialize Express app
const app = express();
const port = 3000;

// Configure CORS
app.use(cors({
	origin: ['http://localhost:7002', 'http://localhost:3000'], // Adjust this to match your frontend URL
	optionsSuccessStatus: 200,
	methods: ["POST", "GET"],
	preflightContinue: false,
	allowedHeaders: ['Content-Type'],
}));

// Ensure uploads directories exist
const UPLOADS_DIR = 'uploads/';
const TEMP_DIR = 'uploads/temp/';
const FINAL_DIR = 'uploads/final/';

if (!fs.existsSync(UPLOADS_DIR)) {
	fs.mkdirSync(UPLOADS_DIR);
}

if (!fs.existsSync(TEMP_DIR)) {
	fs.mkdirSync(TEMP_DIR);
}

if (!fs.existsSync(FINAL_DIR)) {
	fs.mkdirSync(FINAL_DIR);
}

// Configure Multer for temporary storage
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, TEMP_DIR);
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + path.extname(file.originalname));
	},
});

const upload = multer({storage}).array('files', 10); // Accept up to 10 files

app.get("/", (req, res) => {
	res.send("Healthcheck Okay");
});

app.use('/uploads', express.static(path.join(__dirname, UPLOADS_DIR)));

const validateFile = (file: Express.Multer.File, tempFilePath: string): Promise<boolean> => {
	return new Promise((resolve, reject) => {
		const isValidSize = file.size / 1024 / 1024 <= 2 //* 2MB
		if (!isValidSize) {
			console.error(`File size is too large: ${file.size}`);
			return resolve(false);
		}

		const allowedTypes = ["image/jpeg", "image/png", "application/pdf"]
		const isTypeValid = allowedTypes.includes(file.mimetype)
		if (!isTypeValid) {
			console.error(`File type is not allowed: ${file.mimetype}`);
			return resolve(false);
		}

		fs.stat(tempFilePath, (err, stats) => {
			if (err) {
				resolve(false)
			} else {
				resolve(stats.size > 0)
			}
		})
	})
}

app.post('/upload', (req, res) => {
	upload(req, res, async (err) => {
		if (err) {
			console.error('Error uploading files:', err);
			return res.status(500).send('Error uploading files.');
		}

		if (!req.files || req.files.length === 0) {
			return res.status(400).send('No files uploaded.');
		}

		const filesArray = req.files as Express.Multer.File[];
		const validFiles = [];
		for (const file of filesArray) {
			const tempPath = path.join(TEMP_DIR, file.filename);
			const finalPath = path.join(FINAL_DIR, file.filename);

			const isValid = await validateFile(file, tempPath);
			if (isValid) {
				fs.renameSync(tempPath, finalPath);
				validFiles.push({filename: file.filename, originalname: file.originalname, path: finalPath});
			} else {
				fs.unlinkSync(tempPath);
			}
		}

		if (validFiles.length > 0) {
			const token = signToken({files: validFiles}, '1h');
			res.status(200).json({token});
		} else {
			res.status(400).send('No valid files uploaded.');
		}
	});
});

// Start the server
app.listen(port, () => {
	console.log(`File upload service listening at http://localhost:${port}`);
});
