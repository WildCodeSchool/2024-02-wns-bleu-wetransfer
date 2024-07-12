import { Field, ObjectType } from "type-graphql";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import {Upload} from './upload'

@ObjectType()
@Entity()
export class Visitor extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn("uuid")
	id: number;

	@Field()
	@Column({ type: "character varying", nullable: false })
	email: string;

	@Field()
	@Column({ type: "boolean", nullable: false, default: false })
	email_is_verified: boolean;

	@Field()
	@Column({ type: "integer", nullable: false, default: '0000' })
	code: number;

	@Field()
	@CreateDateColumn({ type: "timestamp with time zone" })
	created_at: Date;

	@Field()
	@CreateDateColumn({ type: "timestamp with time zone" })
	updated_at: Date;

	@OneToMany(() => Upload, upload => upload.visitor)
	uploads: Upload[];
}
