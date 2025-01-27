import {User} from "./user";
import {Plan} from "./plan";

export type Billing = {
	id: number;
	subscription_date: Date;
	end_subscription_date: Date;
	next_payment_date: Date;
	last_payment_date: Date;
	created_at: Date;
	updated_at: Date;
	plan: Plan;
	user: User;
}