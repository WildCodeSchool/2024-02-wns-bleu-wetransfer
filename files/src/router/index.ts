import express from "express";
import {addNewUpload, deleteFile, downloadFiles} from "../controllers/filesController";

const router = express.Router()

router.post('/upload', addNewUpload)

router.delete('/delete', deleteFile)

router.post('/download', downloadFiles)

export default router