import { Body, Controller, Post, Res, UseGuards } from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";
import { AuthGuard } from "@nestjs/passport";
import { Login } from "src/book/dto/login.dto";
import { ApiBearerAuth } from "@nestjs/swagger";

@ApiBearerAuth()
@Controller("authentication")
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post("login")
  async login(@Body() req) {
    return this.authenticationService.login(req);
  }

  @Post("test")
  async testLogin(@Body() login: Login) {
    return this.authenticationService.validateUser(login);
  }
}
