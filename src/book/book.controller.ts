import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { BookService } from './book.service';
import { BookInLibrary } from 'src/entity';
import { SearchBookQuery } from './dto/search-book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}
  @Get()
  async getAllBooks(@Query() query: SearchBookQuery): Promise<BookInLibrary[]> {
    return this.bookService.getBooksByNameBook(query);
  }

  @Get('/borrow-desc')
  async sortBrrowsDESC() {
    return this.bookService.sortBrrowsDESC();
  }

  @Get('/borrow-asc')
  async sortBrrowsASC() {
    return this.bookService.sortBrrowsASC();
  }

  @Get('/getAllCategory')
  async getAllCategory() {
    return this.bookService.getAllCategory();
  }

  @Get('/getAllAuthor')
  async getAllAuthor() {
    return this.bookService.getAllAuthor();
  }

  @Get('/getAllCategory')
  async findAllCategory(@Body() category: string) {
    return this.bookService.findAllCategory(category);
  }

  @Post('/findAddBookByAuthor')
  async findBookByAuthor(@Query('name') author: string) {
    return this.bookService.findBookByAuthor(author);
  }
}
