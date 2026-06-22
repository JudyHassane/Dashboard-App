import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { ActivityAction } from "./enums";
import { User } from "../users/user.entity";

@Entity()
export class ActivityLog {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "enum", enum: ActivityAction })
  action!: ActivityAction;

  @Column({ type: "varchar" })
  message!: string;

  @Column({ type: "int", nullable: true })
  entityId?: number;

  @ManyToOne(() => User, { nullable: true, eager: true })
  user?: User;

  @CreateDateColumn()
  createdAt!: Date;
}
