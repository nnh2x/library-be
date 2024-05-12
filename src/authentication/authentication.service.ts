import { Injectable, NotAcceptableException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { Login } from "src/book/dto/login.dto";
import { UsersService } from "src/users/users.service";
@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(login: Login): Promise<any> {
    const user = await this.usersService.getUser(login.name);
    if (!user) return null;
    const passwordValid = await bcrypt.compare(login.password, user.password);
    if (!user) {
      throw new NotAcceptableException("could not find the user");
    }
    if (user && passwordValid) {
      return user;
    }
    return null;
  }
  async login(user: Login) {
    console.log(user);
    const payload = { name: user.name, sub: user.password };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
