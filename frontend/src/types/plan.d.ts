import {Billing} from "./billing";

export type Plan = {
	id: number;
	name: string;
	price: number;
	billing: string;
	description: string
	created_at: Date;
	updated_at: Date;
	billings: Billing[];
}