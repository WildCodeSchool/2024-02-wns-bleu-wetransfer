import express from 'express';
import multer from 'multer';
import path from 'path';
import axios from 'axios';

const app = express();
const port = 3000;

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/');
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + path.extname(file.originalname));
	},
});

const upload = multer({storage});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/upload', upload.single('file'), async (req, res) => {
	if (!req.file) {
		return res.status(400).send('No file uploaded.');
	}

	try {
		const fileData = {
			filename: req.file.filename,
			originalname: req.file.originalname,
			size: req.file.size,
			path: req.file.path,
		};

		const response = await axios.post('http://db:4000/files', fileData);
		res.json({downloadUrl: response.data.downloadUrl});
	} catch (error) {
		res.status(500).send('Error uploading file.');
	}
});

app.listen(port, () => {
	console.log(`File upload service listening at http://localhost:${port}`);
});
