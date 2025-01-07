import {Field, ObjectType} from "type-graphql";
import {BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn,} from "typeorm";

import {Billing} from "./billing";

@ObjectType()
@Entity()
export class Plan extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column()
	name: string;

	@Field()
	@Column()
	price: number;

	@Field()
	@Column()
	billing: string;

	@Field()
	@Column()
	description: string

	@Field()
	@Column({type: "boolean", default: false, nullable: true})
	is_suggested: boolean

	@Field()
	@CreateDateColumn({type: "timestamp"})
	created_at: Date;

	@Field()
	@CreateDateColumn({type: "timestamp"})
	updated_at: Date;

	@Field(() => [Billing])
	@OneToMany(() => Billing, billing => billing.plan)
	billings: Billing[];
}
