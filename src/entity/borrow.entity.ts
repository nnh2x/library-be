import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { BaseEntity, BookInLibrary } from '.';
import { User } from './user.entity';
@Entity('borrow')
export class Borrow extends BaseEntity {
  @Column('varchar', { name: 'name', length: 1000000, nullable: true })
  name: string;

  @ManyToOne(() => BookInLibrary, (book) => book.borrows)
  @JoinColumn({ name: 'book_id' })
  book: BookInLibrary;

  @ManyToOne(() => User, (user) => user.borrows)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ default: 'Đang mượn' })
  status: string;

  @Column({ default: 'Đang mượn' })
  history: string;

  @CreateDateColumn({ name: 'borrow_date' }) borrow_date: Date;

  @UpdateDateColumn({ name: 'return_date' }) return_date: Date;
}
