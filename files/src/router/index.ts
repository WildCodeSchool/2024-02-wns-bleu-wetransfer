import express from "express";
import {
	addNewUpload,
	deleteFile,
	downloadFiles,
	getOneFile,
} from "../controllers/filesController";

const router = express.Router();

router.post("/get-one", getOneFile);
router.post("/upload", addNewUpload);
router.post("/download", downloadFiles);

router.delete("/delete", deleteFile);
// blob:http://localhost:7002/files/f6b04590-02f1-45db-a7e7-ec9ee352ef4f

export default router;
