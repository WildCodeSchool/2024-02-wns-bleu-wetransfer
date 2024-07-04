import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class UserAccessFile extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @ManyToMany(() => UserAccessFile)
  @JoinTable({
    name: "user_file",
    joinColumn: {
      name: "file",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "user",
      referencedColumnName: "id",
    },
  })
  user_access_file: UserAccessFile[];
}
