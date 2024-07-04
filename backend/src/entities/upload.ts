import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { File } from "./file";

@ObjectType()
@Entity()
export class Upload extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  token_value: string;

  @Field()
  @Column()
  is_activated: boolean;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @CreateDateColumn()
  updated_at: Date;

  @OneToMany(() => File, (file) => file.upload)
  files: File[];
}
