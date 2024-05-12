/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BookInLibrary } from "src/entity";
import { Like, Repository } from "typeorm";
import { SearchBookQuery } from "./dto/search-book.dto";
import { Author } from "src/entity/author.entity";
import { Category } from "src/entity/category.entity";
import { PageOptionsDto } from "./dto/page-option.dto";
import { Book, Books } from "./dto/book-detail.dto";
import { PageDto } from "./dto/page.dto";
import { PageMetaDto } from "./dto/page-meta.dto";

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookInLibrary)
    private readonly bookRepository: Repository<BookInLibrary>,
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}
  async getBooksByNameBook(query: SearchBookQuery): Promise<BookInLibrary[]> {
    const { search, author, category_ids } = query;
    const conditions: Record<string, any> = {};
    const pageSize = query.page_size || 10;
    const skip = query.page_index || 0;
    const queryBuilder = await this.bookRepository
      .createQueryBuilder("book_in_library")
      .leftJoinAndSelect("book_in_library.author", "author")
      .leftJoinAndSelect("book_in_library.category", "category");

    if (search) {
      conditions.search = `%${search}%`;
      queryBuilder.andWhere(
        "book_in_library.name_of_book LIKE :search",
        conditions,
      );
    }

    if (author) {
      conditions.author = `%${author}%`;
      queryBuilder.andWhere("author.name LIKE :name", {
        name: `%${author}%`,
      });
    }

    if (category_ids) {
      if (category_ids) {
        const resData = category_ids.toString().split(",");
        queryBuilder.andWhere("category.id IN (:...ids)", {
          ids: resData,
        });
      }
    }
    const s = await queryBuilder.take(pageSize).skip(skip).getMany();
    console.log(s);
    const books = await queryBuilder.getMany();
    return books;
  }

  sortBrrowsDESC() {
    const books = this.bookRepository
      .createQueryBuilder("book_in_library")
      .orderBy("book_in_library.borrow_count", "DESC")
      .getMany();
    return books;
  }

  sortBrrowsASC() {
    const books = this.bookRepository
      .createQueryBuilder("book_in_library")
      .orderBy("book_in_library.borrow_count", "ASC")
      .getMany();
    return books;
  }

  async getAllCategory() {
    const queryBuilder = await this.categoryRepository.find({
      select: {
        name_category: true,
      },
    });
    return queryBuilder;
  }

  findAllCategory(category: string) {
    const queryBuilder = this.categoryRepository.find({
      where: {
        name_category: category,
      },
    });
    return queryBuilder;
  }

  async findBookByAuthor(nameAuthor: string) {
    const queryBuilderAuthor = await this.authorRepository.findOne({
      where: { name: nameAuthor },
    });

    if (queryBuilderAuthor) {
      const id = queryBuilderAuthor.id;
      const queryBuilder = await this.bookRepository
        .createQueryBuilder("book_in_library")
        .where("book_in_library.author_id = :author_id", { author_id: id })
        .getMany();
      return queryBuilder;
    }

    return [];
  }

  async getAllAuthor() {
    const queryBuilder = await this.authorRepository.find({
      select: {
        name: true,
      },
    });
    return queryBuilder;
  }

  async getBook(pageOptionsDto: PageOptionsDto): Promise<PageDto<Book[]>> {
    const { category_ids, search } = pageOptionsDto;
    const conditions: Record<string, any> = {};
    parseFloat;
    const queryBuilder = this.bookRepository
      .createQueryBuilder("book_in_library")
      .leftJoinAndSelect("book_in_library.author", "author")
      .leftJoinAndSelect("book_in_library.category", "category");

    queryBuilder
      .orderBy("book_in_library.name_of_book", pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    if (search) {
      conditions.search = `%${search}%`;
      queryBuilder.andWhere(
        "book_in_library.name_of_book LIKE :search",
        conditions,
      );
    }

    if (category_ids) {
      if (category_ids) {
        const resData = category_ids.toString().split(",");
        queryBuilder.andWhere("category.id IN (:...ids)", {
          ids: resData,
        });
      }
    }

    const itemCount = await queryBuilder.getCount();
    const entities = await queryBuilder.getRawAndEntities();
    const res = entities.entities;
    const transformedEntities: Book[] = res.map((e) => {
      if (e) {
        return {
          id: e.id,
          created_by: e.created_by,
          updated_by: e.updated_by,
          created_at: e.created_at,
          updated_at: e.updated_at,
          name_of_book: e.name_of_book,
          published_year: e.published_year,
          borrow_count: e.borrow_count,
          created_at_book: e.created_at_book,
          updated_at_book: e.updated_at_book,
          author: e.author !== null ? e.author.name : "",
          category: e.category !== null ? e.category.name_category : "",
        };
      }
      return [];
    }) as any;
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    return new PageDto(transformedEntities as any, pageMetaDto);
  }
}
