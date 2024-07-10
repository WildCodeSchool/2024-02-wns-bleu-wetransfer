import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import cors from 'cors';

// Initialize Express app
const app = express();
const port = 3000;

// Configure CORS
app.use(cors({
	origin: 'http://localhost:5173', // Adjust this to match your frontend URL
	optionsSuccessStatus: 200,
	methods: "POST",
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

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, UPLOADS_DIR)));

// Endpoint to handle file uploads
app.post('/upload', (req, res) => {
	upload(req, res, (err) => {
		if (err) {
			console.error('Error uploading files:', err);
			return res.status(500).send('Error uploading files.');
		}

		if (!req.files || req.files.length === 0) {
			return res.status(400).send('No files uploaded.');
		}

		// Perform server-side validation if needed
		const filesArray = req.files as Express.Multer.File[];
		filesArray.forEach(file => {
			const tempPath = path.join(TEMP_DIR, file.filename);
			const finalPath = path.join(FINAL_DIR, file.filename);
			fs.rename(tempPath, finalPath, (err) => {
				if (err) {
					console.error('Error moving file:', err);
					return res.status(500).send('Error processing files.');
				}
			});
		});

		res.status(200).send('Files uploaded and moved successfully.');
	});
});

// Start the server
app.listen(port, () => {
	console.log(`File upload service listening at http://localhost:${port}`);
});
