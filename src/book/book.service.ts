/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookInLibrary } from 'src/entity';
import { Repository } from 'typeorm';
import { SearchBookQuery } from './dto/search-book.dto';
import { Author } from 'src/entity/author.entity';
import { Category } from 'src/entity/category.entity';

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
    const { search, author, category } = query;
    const conditions: Record<string, any> = {};

    const queryBuilder =
      this.bookRepository.createQueryBuilder('book_in_library');

    if (search) {
      conditions.search = `%${search}%`;
      queryBuilder.andWhere(
        'book_in_library.name_of_book LIKE :search',
        conditions,
      );
    }

    if (author) {
      conditions.author = `%${author}%`;
      queryBuilder
        .leftJoinAndSelect('book_in_library.author', 'author')
        .andWhere('author.name LIKE :name', {
          name: `%${author}%`,
        });
    }
    if (category) {
      conditions.category = `%${category}%`;
      queryBuilder
        .leftJoinAndSelect('book_in_library.category', 'category')
        .andWhere('category.name_category LIKE :name_category', {
          name_category: `%${category}%`,
        });
    }
    return queryBuilder.getMany();
  }

  sortBrrowsDESC() {
    const queryBuilder = this.bookRepository
      .createQueryBuilder('book_in_library')
      .orderBy('book_in_library.borrow_count', 'DESC')
      .getMany();
    return queryBuilder;
  }

  sortBrrowsASC() {
    const queryBuilder = this.bookRepository
      .createQueryBuilder('book_in_library')
      .orderBy('book_in_library.borrow_count', 'ASC')
      .getMany();
    return queryBuilder;
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
        .createQueryBuilder('book_in_library')
        .where('book_in_library.author_id = :author_id', { author_id: id })
        .getMany();
      return queryBuilder;
    }
  }

  async getAllAuthor() {
    const queryBuilder = await this.authorRepository.find({
      select: {
        name: true,
      },
    });
    return queryBuilder;
  }
}
