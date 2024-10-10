import express from "express";
import {addNewUpload} from "../controllers/filesController";

const router = express.Router()

router.post('/upload', addNewUpload)

export default router