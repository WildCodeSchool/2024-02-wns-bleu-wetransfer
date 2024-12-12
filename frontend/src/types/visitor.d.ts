import {Upload} from "./upload";

export type Visitor = {
	id: number;
	email: string;
	email_is_verified: boolean;
	code: number;
	created_at: Date;
	updated_at: Date;
	uploads: Upload[]
}