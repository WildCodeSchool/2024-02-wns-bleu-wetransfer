import fs from "fs";
import path from "path";
import multer from "multer";
import {validateFile} from "../validators/fileValidators";
import {ADD_ONE_UPLOAD} from "../graphql/mutations";
import {Request} from "express";
import axios from "axios";

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
		cb(null, Date.now() + path.extname(file.originalname));
	},
});

const upload = multer({storage}).array("files", 10);

export const addNewUpload = async (req: Request, res: any) => {

	upload(req, res, async (err) => {
		console.log("REQ BODY", req.body)
		if (err) {
			console.error("Error uploading files:", err);
			return res.status(500).send("Error uploading files.");
		}

		if (!req.files || req.files.length === 0) {
			return res.status(400).send("No files uploaded.");
		}

		const filesArray = req.files as Express.Multer.File[];
		const validFiles = [];

		for (const file of filesArray) {
			const tempPath = path.join(TEMP_DIR, file.filename);
			const finalPath = path.join(FINAL_DIR, file.filename);

			const isValid = await validateFile(file, tempPath);
			if (isValid) {
				fs.renameSync(tempPath, finalPath);
				validFiles.push({
					filename: file.filename,
					originalname: file.originalname,
					path: finalPath,
					size: file.size
				});
			} else {
				fs.unlinkSync(tempPath);
			}
		}

		if (validFiles.length > 0) {
			axios.post('http://backend:4000/graphql', {
				query: ADD_ONE_UPLOAD,
				variables: {
					...req.body,
					fileData: JSON.stringify(filesArray[0]),
					filePath: "path",
				},
			}, {
				headers: {
					'Content-Type': 'application/json',
				},
				withCredentials: true
			}).then((response: any) => {
				console.log("DATAAA", response.data)
				res.status(200).json(response.data)

			}).catch((err: any) => {
				console.error(err);
				res.status(500).send("Error during file upload mutation.");
			})

		} else {
			res.status(400).send("No valid files uploaded.");
		}
	});
}