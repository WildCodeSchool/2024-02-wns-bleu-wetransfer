import jwt from 'jsonwebtoken'
import dotenv from "dotenv";
import path from "path";

dotenv.config({path: path.join(__dirname, '../../.env')})

const SECRET_KEY = process.env.JWT_SECRET_KEY!

export const signToken = (payload: object, expiresIn: string | number) => {
	console.log(SECRET_KEY)
	return jwt.sign(payload, SECRET_KEY, {expiresIn})
}

export const verifyToken = (token: string) => {
	try {
		return jwt.verify(token, SECRET_KEY)
	} catch (err) {
		return null
	}
}