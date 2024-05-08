import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { name: 'created_by', nullable: true })
  created_by: string;

  @Column('varchar', { name: 'updated_by', nullable: true })
  updated_by: string;

  @CreateDateColumn({ name: 'created_at' }) created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' }) updated_at: Date;
}
