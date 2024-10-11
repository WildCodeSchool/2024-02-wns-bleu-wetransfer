import jwt from "jsonwebtoken";
import * as process from 'process'
import dotenv from "dotenv";
import path from "path";

dotenv.config({path: path.join(__dirname, '../../../.env')})

export const createDownloadToken = (payload: any, expiresIn: string): string => {
	const secretKey = process.env.JWT_SECRET_KEY

	if (!secretKey) {
		console.error('No secret key provided for download token creation')
		throw new Error('No secret key provided')
	}

	return jwt.sign(payload, secretKey, {expiresIn})
}

export const generateDownloadLink = (token: string) => {
	const downloadPath = `/access/download?token=${token}`
	const domain = process.env.FRONTEND_URL

	return domain + downloadPath
}