import { Entity, Column, OneToMany } from "typeorm";
import { Borrow } from "./borrow.entity";
import { BaseEntity } from "./base.entity";

@Entity("users")
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @OneToMany(() => Borrow, (borrow) => borrow.user)
  borrows: Borrow[];

  @Column()
  password: string;
}
