import { Field, ObjectType } from "type-graphql";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { File } from "./file";
import { Visitor } from "./visitor";

@ObjectType()
@Entity()
export class Upload extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn("uuid")
	id: number;

	@Field()
	@Column({ type: "character varying", nullable: false })
	download_link: string;

	@Field()
	@Column({ type: "boolean", default: false, nullable: false })
	is_activated: boolean;

	@Field()
	@CreateDateColumn({ type: "timestamp with time zone" })
	created_at: Date;

	@Field(() => [String])
	@Column("text", { array: true, nullable: false })
	receivers: string[];

	@Field()
	@CreateDateColumn({ type: "timestamp with time zone" })
	updated_at: Date;

	@OneToMany(() => File, (file) => file.upload)
	files: File[];

	@ManyToOne(() => Visitor, (visitor) => visitor.uploads)
	visitor: Visitor;
}
