import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity, BookInLibrary } from '.';
@Entity('category')
export class Category extends BaseEntity {
  @Column('varchar', { name: 'name', length: 1000000, nullable: true })
  name_category: string;

  @OneToMany(() => BookInLibrary, (book) => book.category)
  books: BookInLibrary[];
}
