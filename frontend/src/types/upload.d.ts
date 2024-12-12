import {User} from "./user";
import {Visitor} from "./visitor";

export type Upload = {
	id: number;
	title: string
	message: string
	is_activated: boolean;
	receivers: string[]
	created_at: Date
	updated_at: Date
	visitor: Visitor
	user: User
	files: File[];
}
