import {Field, InputType, ObjectType} from "type-graphql";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import {Upload} from "./upload";
import {Report} from "./report";
import {UserAccessFile} from "./userAccessFile";

enum StatusOption {
	status1 = "status1",
	status2 = "status2"
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
	@Column({type: "integer", nullable: true})
	size: number;

	@Field()
	@Column({type: "enum", enum: StatusOption, nullable: true, default: StatusOption.status1})
	status: StatusOption;

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
	@JoinColumn({name: 'upload_id'})
	upload: Upload;

	@OneToMany(() => Report, (report) => report.file)
	reports: Report[];

	@OneToOne(() => UserAccessFile)
	@JoinColumn()
	user_access_file: UserAccessFile;
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
