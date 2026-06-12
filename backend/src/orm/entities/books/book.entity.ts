import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne,
} from "typeorm";
import { BookStatus } from "./enums";
import { Category } from "../categories/category.entity";
import { Author } from "../authors/author.entity";

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar" })
  title!: string;

  @ManyToOne(() => Author, (author) => author.books, {
    eager: true,
    nullable: false,
  })
  author!: Author;

  @Column({ type: "varchar", unique: true })
  isbn!: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @ManyToOne(() => Category, (category) => category.books, {
    eager: true,
    nullable: false,
  })
  category!: Category;

  @Column({ type: "varchar" })
  coverImage!: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price!: number;

  @Column({ type: "int", default: 0 })
  stock!: number;

  @Column({
    type: "enum",
    enum: BookStatus,
    default: BookStatus.OUT_OF_STOCK,
  })
  status!: BookStatus;

  @CreateDateColumn()
  dateAdded!: Date;

  @DeleteDateColumn()
  deletedAt!: Date | null;

  @BeforeInsert()
  @BeforeUpdate()
  updateStatus() {
    this.status =
      this.stock > 0 ? BookStatus.AVAILABLE : BookStatus.OUT_OF_STOCK;
  }
}
