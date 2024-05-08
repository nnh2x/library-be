import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from '.';
import { Borrow } from './borrow.entity';
import { Author } from './author.entity';
import { Category } from './category.entity';
@Entity('book-in-library')
export class BookInLibrary extends BaseEntity {
  @Column('varchar', { name: 'name_of_book', length: 1000000, nullable: true })
  name_of_book: string;

  @Column('varchar', {
    name: 'published_year',
    length: 1000000,
    nullable: true,
  })
  published_year: string;

  @Column('int', { name: 'borrow_count', default: 0 })
  borrow_count: number;

  @OneToMany(() => Borrow, (borrow) => borrow.book)
  borrows: Borrow[];

  @ManyToOne(() => Author, (author) => author.books, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'author_id' })
  author: Author;

  @ManyToOne(() => Category, (category) => category.books, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @CreateDateColumn({ name: 'created_at_book' }) created_at_book: Date;

  @CreateDateColumn({ name: 'updated_at_book' }) updated_at_book: Date;
}
