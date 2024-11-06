import {Field, ObjectType} from "type-graphql";
import {BaseEntity, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn,} from "typeorm";
import {File} from "./file";
import {User} from "./user";

@ObjectType()
@Entity()
export class UserAccessFile extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@CreateDateColumn()
	created_at: Date;

	@OneToMany(() => File, file.)
	@JoinColumn()
	file: File;

	@OneToMany(() => User)
	@JoinColumn()
	user: User;
}
