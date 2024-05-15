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
    if (!user) {
      throw new NotAcceptableException("could not find the user");
    }
    const passwordValid = await bcrypt.compare(login.password, user.password);
    if (user && passwordValid) {
      return user;
    }
    return null;
  }
  async login(user: Login): Promise<any> {
    const userLogin = await this.usersService.getUser(user.name);
    if (!userLogin) {
      throw new NotAcceptableException("could not find the user");
    }
    const passwordValid = await bcrypt.compare(
      user.password,
      userLogin.password,
    );
    if (userLogin && passwordValid) {
      const payload = { name: userLogin.name, sub: userLogin.password };
      const saltOrRounds = 10;
      return {
        ...userLogin,
        password: await bcrypt.hash(userLogin.password, saltOrRounds),
        access_token: await this.jwtService.signAsync(payload),
      };
    }
    return null;
  }
}
