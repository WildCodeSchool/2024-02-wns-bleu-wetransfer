import {Field, ObjectType} from "type-graphql";
import {BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn,} from "typeorm";
import {File} from "./file";

@ObjectType()
@Entity()
export class Visitor extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column()
	email: string;

	@Field()
	@Column({default: false})
	email_is_verified: boolean;

	@Field()
	@Column()
	code: number;

	@Field()
	@CreateDateColumn()
	created_at: Date;

	@Field()
	@CreateDateColumn()
	updated_at: Date;

	@OneToMany(() => File, (file) => file.visitor)
	files: File[];
}
