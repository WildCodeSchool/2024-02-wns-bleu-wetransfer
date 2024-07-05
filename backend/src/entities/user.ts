import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Billing } from "./billing";
import { File } from "./file";
import { UserAccessFile } from "./userAccessFile";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstname: string;

  @Field()
  @Column()
  lastname: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column({ nullable: true })
  profile_picture_name: string;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @CreateDateColumn()
  updated_at: Date;

  @OneToOne(() => Billing)
  @JoinColumn()
  billing: Billing;

  @OneToMany(() => File, (file) => file.user)
  files: File;

  @OneToOne(() => UserAccessFile)
  @JoinColumn()
  user_access_file: UserAccessFile;
}
