import {Field, InputType, ObjectType} from "type-graphql";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import {Upload} from "./upload";
import {Report} from "./report";
import {User} from "./user";

export enum StatusOption {
	status1 = "public",
	status2 = "private"
}

@ObjectType()
@Entity()
export class File extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column({type: "character varying", nullable: true})
	file_uid: string

	@Field()
	@Column({type: "character varying", nullable: true})
	name: string;

	@Field()
	@Column({type: "character varying", nullable: true})
	default_name: string;

	@Field()
	@Column({type: "character varying", nullable: true})
	path: string;

	@Field()
	@Column()
	test: string;

	@Field()
	@Column({type: "integer", nullable: true})
	size: number;

	@Field()
	@Column({nullable: true, default: StatusOption.status1})
	privacy_status: StatusOption;

	@Field()
	@Column({type: "character varying", nullable: true})
	type: string;

	@Field()
	@CreateDateColumn()
	created_at: Date;

	@Field()
	@CreateDateColumn()
	updated_at: Date;

	@ManyToOne(() => Upload, (upload) => upload.files)
	upload: Upload;

	@OneToMany(() => Report, (report) => report.file)
	reports: Report[];

	@ManyToMany(() => User, user => user.accessed_files, {cascade: true})
	@JoinTable({
		name: 'user_access_file',
		joinColumn: {
			name: "file_id",
			referencedColumnName: 'id'
		},
		inverseJoinColumn: {
			name: 'user_id',
			referencedColumnName: 'id'
		}
	})
	users_with_access: User[]
}

@InputType()
export class FileDataInput {
	@Field()
	uid: string;

	@Field()
	name: string;

	@Field()
	type: string;

	@Field()
	size: number;
}
