import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class Visitors extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  email_is_verified: boolean;

  @Field()
  @Column()
  code: number;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @CreateDateColumn()
  updated_at: Date;
}
