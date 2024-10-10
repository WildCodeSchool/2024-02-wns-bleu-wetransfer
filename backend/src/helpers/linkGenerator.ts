import process from "node:process";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config({path: '../../../.env'})

console.log(process.env.JWT_SECRET_KEY)

export const createDownloadToken = (payload: any, expiresIn: string): string => {
	const secretKey = process.env.JWT_SECRET_KEY

	if (!secretKey) {
		console.error('No secret key provided for download token creation')
		throw new Error('No secret key provided')
	}

	return jwt.sign(payload, secretKey, {expiresIn})
}

export const generateDownloadLink = (token: string) => {
	const downloadPath = `/file/download?token=${token}`
	const domain = process.env.FRONTEND_URL

	return domain + downloadPath
}