import { Field, ObjectType } from "type-graphql";
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
import { User } from "./user";
import { Upload } from "./upload";
import { Report } from "./report";
import { UserAccessFile } from "./userAccessFile";

@ObjectType()
@Entity()
export class File extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Field()
  @Column({type: "character varying", nullable: true})
  name: string;

  @Field()
  @Column({type: "character varying", nullable: false})
  default_name: string;

  @Field()
  @Column({type: "character varying", nullable: false})
  path: string;

  @Field()
  @Column({type: "integer", nullable: false})
  size: number;

  @Field()
  @Column({type: "boolean", nullable: true})
  status: string;

  @Field()
  @CreateDateColumn({type: "timestamp with time zone"})
  created_at: Date;

  @Field()
  @CreateDateColumn({type: "timestamp with time zone"})
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.files)
  user: User;

  @ManyToOne(() => Upload, (upload) => upload.files)
  upload: Upload;

  @OneToMany(() => Report, (report) => report.file)
  reports: Report[];

  @OneToOne(() => UserAccessFile)
  @JoinColumn()
  user_access_file: UserAccessFile;
}
