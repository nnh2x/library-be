import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
} from "@nestjs/common";
import { BookService } from "./book.service";
import { PageOptionsDto } from "./dto/page-option.dto";
import { PageDto } from "./dto/page.dto";
import { Books } from "./dto/book-detail.dto";
import { AuthGuard } from "src/authentication/authentication.guard";

@UseGuards(AuthGuard)
@Controller("book")
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get("/categories")
  async getAllCategory() {
    return this.bookService.categorys();
  }

  @Get("/authors")
  async getAllAuthor() {
    return this.bookService.getAllAuthor();
  }

  @Get(":category")
  async findAllCategory(@Query("category") category: string) {
    return this.bookService.findBookByCategory(category);
  }

  @Get(":author")
  @HttpCode(HttpStatus.OK)
  async findBookByAuthor(@Query("author") author: string) {
    return this.bookService.findBookByAuthor(author);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async books(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Books>> {
    return this.bookService.getBook(pageOptionsDto);
  }
}
