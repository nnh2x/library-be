import { Column, CreateDateColumn, Entity } from "typeorm";
import { BaseEntity } from ".";
@Entity('book-in-library')
export class BookInLibrary extends BaseEntity {

  @Column("varchar", { name: "name_of_book", length: 1000000, nullable: true })
  name_of_book: string;

  @Column("varchar", { name: "author_id", length: 1000000, nullable: true })
  author_id: string;

  @Column("varchar", { name: "published_year", length: 1000000, nullable: true })
  published_year: string;

  @Column("varchar", { name: "category_id", length: 1000000, nullable: true })
  category_id: string;

  @CreateDateColumn({ name: "borrow_count" }) borrow_count: Date;

  @CreateDateColumn({ name: "created_at_book" }) created_at_book: Date;
  
  @CreateDateColumn({ name: "updated_at_book" }) updated_at_book: Date;
}
