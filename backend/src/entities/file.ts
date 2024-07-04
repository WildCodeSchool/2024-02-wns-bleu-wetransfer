import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Visitor } from "./visitor";
import { User } from "./user";
import { Upload } from "./upload";
import { Report } from "./report";

@ObjectType()
@Entity()
export class File extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  default_name: string;

  @Field()
  @Column()
  path: string;

  @Field()
  @Column()
  size: number;

  @Field()
  @Column()
  download_link: string;

  @Field()
  @Column()
  status: string;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @CreateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Visitor, (visitor) => visitor.files)
  visitor: Visitor;

  @ManyToOne(() => User, (user) => user.files)
  user: User;

  @ManyToOne(() => Upload, (upload) => upload.files)
  upload: Upload;

  @OneToMany(() => Report, (report) => report.file)
  reports: Report[];
}
