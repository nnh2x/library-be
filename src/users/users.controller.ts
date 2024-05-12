import { Body, Controller, Post } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "src/book/dto/create-user.dto";
import { User } from "src/entity/user.entity";
import { Repository } from "typeorm";
import { UsersService } from "./users.service";
import * as bcrypt from "bcrypt";
@Controller("users")
export class UsersController {
  constructor(readonly userService: UsersService) {}

  @Post("/signup")
  async createUser(@Body() createUser: CreateUserDto): Promise<User> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(createUser.password, saltOrRounds);
    createUser.password = hashedPassword;
    const result = await this.userService.createUser(createUser);
    return result;
  }
}
