import {Field, ObjectType} from "type-graphql";
import {
	BaseEntity,
	BeforeInsert,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import {Plan} from "./plan";
import {User} from "./user";
import {addMonths} from "date-fns";

@ObjectType()
@Entity()
export class Billing extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@CreateDateColumn()
	subscription_date: Date;

	@Field({nullable: true})
	@Column({nullable: true})
	end_subscription_date: Date;

	@Field()
	@Column()
	next_payment_date: Date;

	@Field()
	@Column()
	last_payment_date: Date;

	@Field()
	@CreateDateColumn()
	created_at: Date;

	@Field()
	@CreateDateColumn()
	updated_at: Date;

	@Field(() => Plan)
	@ManyToOne(() => Plan, plan => plan.billings)
	@JoinColumn({name: "plan_id", referencedColumnName: "id"})
	plan: Plan;

	@OneToOne(() => User, user => user.billing)
	@JoinColumn()
	user: User;

	@BeforeInsert()
	setNextPaymentDate() {
		if (!this.next_payment_date) {
			this.next_payment_date = addMonths(new Date(), 1);
		}
	}
}
