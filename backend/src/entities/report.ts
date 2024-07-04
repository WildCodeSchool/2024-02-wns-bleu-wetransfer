import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { File } from "./file";

@ObjectType()
@Entity()
export class Report extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  comment: string;

  @Field()
  @Column()
  status: string;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @CreateDateColumn()
  updated_at: Date;

  @ManyToOne(() => File, (file) => file.reports)
  file: File;
}
