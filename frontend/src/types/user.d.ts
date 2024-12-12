import {Upload} from "./upload";

export type User = {
	id: number
	firstname: string;
	lastname: string;
	email: string;
	password: string;
	profile_picture_name: string;
	role: string
	created_at: Date;
	updated_at: Date;
	billing: Billing;
	accessed_files: File[];
	uploads: Upload[]
};
