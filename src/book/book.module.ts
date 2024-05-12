import { Module } from "@nestjs/common";
import { BookService } from "./book.service";
import { BookController } from "./book.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookInLibrary } from "src/entity";
import { Author } from "src/entity/author.entity";
import { Category } from "src/entity/category.entity";

@Module({
  imports: [TypeOrmModule.forFeature([BookInLibrary, Author, Category])],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
