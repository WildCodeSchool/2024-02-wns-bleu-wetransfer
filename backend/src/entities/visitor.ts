import {Field, ObjectType} from "type-graphql";
import {BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn,} from "typeorm";
import {File} from "./file";
import {Upload} from "./upload";

@ObjectType()
@Entity()
export class Visitor extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column({type: "character varying", nullable: false})
	email: string;

	@Field()
	@Column({type: 'boolean', nullable: false, default: false})
	email_is_verified: boolean;

	@Field()
	@Column({type: "integer", length: 6, nullable: false})
	code: number;

	@Field()
	@CreateDateColumn()
	created_at: Date;

	@Field()
	@CreateDateColumn()
	updated_at: Date;

	@OneToMany(() => File, (file) => file.visitor)
	files: File[];

	@OneToMany(() => Upload, upload => upload.visitor)
	uploads: Upload[]
}
