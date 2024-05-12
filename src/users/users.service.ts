import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "src/book/dto/create-user.dto";
import { User } from "src/entity/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUser: CreateUserDto): Promise<User> {
    const { name, password } = createUser;
    console.log("createUser", createUser);
    const newUser = this.userRepository.create({
      name,
      password,
      email: "huy@bat.com",
    });
    this.userRepository.save(newUser);
    return newUser;
  }
  async getUser(name: string): Promise<User> {
    return this.userRepository.findOne({ where: { name: name } });
  }
}
