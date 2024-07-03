import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Plans } from "./plans";

@ObjectType()
@Entity()
export class Billing extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @CreateDateColumn()
  subscription_date: Date;

  @Field()
  @CreateDateColumn()
  end_subscription_date: Date;

  @Field()
  @CreateDateColumn()
  next_payment_date: Date;

  @Field()
  @CreateDateColumn()
  last_payment_date: Date;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @CreateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Plans)
  @JoinColumn({ name: "plans_id", referencedColumnName: "id" })
  plan: Plans;
}
