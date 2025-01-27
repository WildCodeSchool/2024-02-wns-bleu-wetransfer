import fs from "fs";

export const validateFile = (
	file: Express.Multer.File,
	tempFilePath: string
): Promise<boolean> => {
	return new Promise((resolve, reject) => {
		const isValidSize = file.size / 1024 / 1024 <= 2; //* 2MB
		if (!isValidSize) {
			console.error(`File size is too large: ${file.size}`);
			return resolve(false);
		}

		const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
		const isTypeValid = allowedTypes.includes(file.mimetype);
		if (!isTypeValid) {
			console.error(`File type is not allowed: ${file.mimetype}`);
			return resolve(false);
		}

		fs.stat(tempFilePath, (err, stats) => {
			if (err) {
				resolve(false);
			} else {
				resolve(stats.size > 0);
			}
		});
	});
};