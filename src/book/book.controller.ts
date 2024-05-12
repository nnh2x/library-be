import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from "@nestjs/common";
import { BookService } from "./book.service";
import { PageOptionsDto } from "./dto/page-option.dto";
import { PageDto } from "./dto/page.dto";
import { Books } from "./dto/book-detail.dto";
import { ApiBasicAuth } from "@nestjs/swagger";

ApiBasicAuth();
@Controller("book")
export class BookController {
  constructor(private readonly bookService: BookService) {}
  // @Get()
  // async getAllBooks(@Query() query: SearchBookQuery): Promise<BookInLibrary[]> {
  //   return this.bookService.getBooksByNameBook(query);
  // }

  @Get("/borrow-desc")
  async sortBrrowsDESC() {
    return this.bookService.sortBrrowsDESC();
  }

  @Get("/borrow-asc")
  async sortBrrowsASC() {
    return this.bookService.sortBrrowsASC();
  }

  @Get("/categories/{{id}")
  async getAllCategory() {
    return this.bookService.getAllCategory();
  }

  @Get("/getAllAuthor")
  async getAllAuthor() {
    return this.bookService.getAllAuthor();
  }

  @Get("/getAllCategory")
  async findAllCategory(@Body() category: string) {
    return this.bookService.findAllCategory(category);
  }

  @Post("/findAddBookByAuthor")
  async findBookByAuthor(@Query("name") author: string) {
    return this.bookService.findBookByAuthor(author);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getUsers(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Books>> {
    return this.bookService.getBook(pageOptionsDto);
  }
}
