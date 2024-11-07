import {Field, ObjectType} from "type-graphql";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import {File} from "./file";
import {Visitor} from "./visitor";
import {User} from "./user";


@ObjectType()
@Entity()
export class Upload extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column({type: "character varying", nullable: false})
	title: string

	@Field()
	@Column({type: "text", nullable: true})
	message: string

	@Field()
	@Column({type: 'boolean', nullable: false, default: false})
	is_activated: boolean;

	@Field(() => [String])
	@Column({type: "text", array: true, nullable: false})
	receivers: string[]

	@Field()
	@CreateDateColumn()
	created_at: Date;

	@Field()
	@UpdateDateColumn()
	updated_at: Date;

	@ManyToOne(() => Visitor, visitor => visitor.uploads)
	visitor: Visitor

	@ManyToOne(() => User, user => user.uploads)
	user: User

	@Field(() => [File])
	@OneToMany(() => File, (file) => file.upload)
	files: File[];
}
