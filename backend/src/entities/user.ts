import {Field, ObjectType} from "type-graphql";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	ManyToMany,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import {Billing} from "./billing";
import {Upload} from "./upload";
import {File} from "./file";

@ObjectType()
@Entity()
export class User extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column()
	firstname: string;

	@Field()
	@Column()
	lastname: string;

	@Field()
	@Column()
	email: string;

	@Field()
	@Column()
	password: string;

	@Field()
	@Column({nullable: true})
	profile_picture_name: string;

	@Field()
	@Column({default: 'user'})
	role: string

	@Field()
	@CreateDateColumn()
	created_at: Date;

	@Field()
	@CreateDateColumn()
	updated_at: Date;

	@OneToOne(() => Billing, billing => billing.user, {cascade: true})
	billing: Billing;

	@ManyToMany(() => File, file => file.users_with_access)
	accessed_files: File[];

	@OneToMany(() => Upload, upload => upload.user)
	uploads: Upload[]
}


@ObjectType()
export class UserInfo {
	@Field()
	isLoggedIn!: boolean;

	@Field()
	email!: string;

	@Field()
	role!: string;

	@Field()
	firstname!: string;

	@Field()
	lastname!: string;
}
