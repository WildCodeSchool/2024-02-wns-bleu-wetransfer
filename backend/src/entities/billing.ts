import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Plan } from "./plan";
import { User } from "./user";

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

  @ManyToOne(() => Plan)
  @JoinColumn({ name: "plan_id", referencedColumnName: "id" })
  plan: Plan;

  @OneToOne(() => Billing)
  @JoinColumn()
  user: User;
}
