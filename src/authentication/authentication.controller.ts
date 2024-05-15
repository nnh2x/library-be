import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";
import { Login } from "src/book/dto/login.dto";
import { AuthGuard } from "./authentication.guard";
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

  @UseGuards(AuthGuard)
  @Get("profile")
  getProfile(@Req() req) {
    return req.user;
  }
}
