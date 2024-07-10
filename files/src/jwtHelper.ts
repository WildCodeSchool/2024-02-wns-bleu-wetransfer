import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.JWT_SECRET_KEY!
console.log(SECRET_KEY)

export const signToken = (payload: object, expiresIn: string | number) => {
	return jwt.sign(payload, SECRET_KEY, {expiresIn})
}

export const verifyToken = (token: string) => {
	try {
		return jwt.verify(token, SECRET_KEY)
	} catch (err) {
		return null
	}
}