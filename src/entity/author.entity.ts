import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity, BookInLibrary } from ".";
@Entity("author")
export class Author extends BaseEntity {
  @Column("varchar", { name: "name", length: 1000000, nullable: true })
  name: string;

  @OneToMany(() => BookInLibrary, (book) => book.author)
  books: BookInLibrary[];
}
