import { Column, CreateDateColumn, Entity } from "typeorm";
import { BaseEntity } from ".";
@Entity('author')
export class Author extends BaseEntity {
  @Column("varchar", { name: "name", length: 1000000, nullable: true })
  name: string;
}
