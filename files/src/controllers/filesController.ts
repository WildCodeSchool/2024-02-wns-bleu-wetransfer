import fs from "fs";
import path from "path";
import multer from "multer";
import {validateFile} from "../validators/fileValidators";
import {ADD_ONE_UPLOAD} from "../graphql/mutations";
import {Request} from "express";
import axios from "axios";
import {v4 as uuidv4} from "uuid";
import archiver from "archiver";

const UPLOADS_DIR = path.join(__dirname, "../uploads");
const TEMP_DIR = path.resolve(UPLOADS_DIR, "temp");
const FINAL_DIR = path.resolve(UPLOADS_DIR, "final");

if (!fs.existsSync(UPLOADS_DIR)) {
	fs.mkdirSync(UPLOADS_DIR, {recursive: true});
}

if (!fs.existsSync(TEMP_DIR)) {
	fs.mkdirSync(TEMP_DIR, {recursive: true});
}

if (!fs.existsSync(FINAL_DIR)) {
	fs.mkdirSync(FINAL_DIR, {recursive: true});
}

export const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, TEMP_DIR);
	},
	filename: (req, file, cb) => {
		const fileUuid = uuidv4();
		const fileExtension = path.extname(file.originalname);
		const newFilename = `${fileUuid}${fileExtension}`;

		(file as any).original_name = file.originalname;

		cb(null, newFilename);
	},
});

const upload = multer({storage}).array("files", 10);

// This function works but it's WAY too long, we will need to refactor it someday
export const addNewUpload = async (req: Request, res: any) => {
	upload(req, res, async (err) => {
		if (err) {
			return res.status(500).send("Error uploading files.");
		}

		if (!req.files || req.files.length === 0) {
			return res.status(400).send("No files uploaded.");
		}

		const filesArray = req.files as Express.Multer.File[];
		const validFiles = [];

		for (const file of filesArray) {
			const fileUuid = uuidv4();
			const fileExtension = path.extname(file.originalname);
			const fileFinalName = `${fileUuid}${fileExtension}`;
			const tempPath = file.path;
			const finalPath = path.join(FINAL_DIR, fileFinalName);

			const isValid = await validateFile(file, tempPath);
			if (isValid) {
				fs.renameSync(tempPath, finalPath);
				validFiles.push({
					original_name: (file as any).original_name || file.originalname,
					default_name: fileFinalName,
					path: finalPath,
					size: file.size,
					uuid: fileUuid,
					mimetype: file.mimetype,
				});
			} else {
				fs.unlinkSync(tempPath);
			}
		}

		if (validFiles.length > 0) {
			axios.post("http://backend:4000/graphql", {
				query: ADD_ONE_UPLOAD,
				variables: {
					senderEmail: req.body.senderEmail,
					receiversEmails: Array.isArray(req.body.receiversEmails)
						? req.body.receiversEmails
						: [req.body.receiversEmails],
					title: req.body.title || "Default Title",
					message: req.body.message || "Default Message",
					fileData: JSON.stringify(validFiles),
				},
			})
				.then((response) => {
					console.log("DATA:", response.data);
					res.status(200).json(response.data);
				})
				.catch((err) => {
					if (err.response && err.response.data) {
						console.error("GraphQL Errors:", err.response.data.errors);
					} else {
						console.error("Unexpected Error:", err);
					}
					res.status(500).send("Error during file upload mutation.");
				});
		} else {
			res.status(400).send("No valid files uploaded.");
		}
	});
};


export const deleteFile = async (req: Request, res: any) => {
	const filename = req.query.filename

	if (!filename) {
		return res.status(400).send("No filename provided.");
	}

	const filePath = path.join(FINAL_DIR, filename as string);

	if (!fs.existsSync(filePath)) {
		return res.status(404).send(`File not found.`);
	}

	// fs.unlinkSync deletes the file
	fs.unlinkSync(filePath);

	return res.status(200).send("File deleted.");
}

export const downloadFiles = async (req: Request, res: any) => {
	const FILES_DIR = path.join(__dirname, "../uploads/final");
	const files = req.body.files as string[];

	if (!files || files.length === 0) {
		return res.status(400).send("No files provided.");
	}

	res.setHeader("Content-Type", "application/zip");
	res.attachment("files.zip");

	const archive = archiver("zip", {zlib: {level: 9}});

	archive.on("error", (err) => {
		res.status(500).send("Error creating ZIP archive.");
	});

	archive.pipe(res);

	for (const file of files) {
		const filePath = path.join(FILES_DIR, file);
		if (fs.existsSync(filePath)) {
			archive.file(filePath, {name: file});
		} else {
			console.warn(`File not found: ${file}`);
		}
	}

	try {
		await archive.finalize();
	} catch (err) {
		res.status(500).send("Error finalizing ZIP archive.");
	}
};

export const getOneFile = (req: Request, res: any) => {
	try {
		const {fileDefaultName} = req.body;

		console.log(fileDefaultName)

		if (!fileDefaultName) {
			return res.status(400).send("File path is required.");
		}

		const fullPath = path.join(FINAL_DIR, fileDefaultName);

		console.log(fullPath)

		if (!fs.existsSync(fullPath)) {
			return res.status(404).send("File not found.");
		}

		res.setHeader("Content-Type", "application/octet-stream");
		res.setHeader(
			"Content-Disposition",
			`inline; filename="${path.basename(fullPath)}"`
		);

		const fileStream = fs.createReadStream(fullPath);
		fileStream.pipe(res);

		fileStream.on("error", (err) => {
			console.error("Error streaming file:", err);
			res.status(500).send("Error sending file.");
		});
	} catch (err) {
		console.error(err);
		res.status(500).send("Error fetching file for preview.");
	}
};




