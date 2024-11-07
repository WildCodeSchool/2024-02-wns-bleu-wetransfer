import express from "express";
import {addNewUpload, deleteFile} from "../controllers/filesController";

const router = express.Router()

router.post('/upload', addNewUpload)

router.delete('/delete', deleteFile)

export default router