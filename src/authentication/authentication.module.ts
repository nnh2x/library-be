import { Module } from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";
import { AuthenticationController } from "./authentication.controller";
import { PassportModule } from "@nestjs/passport";
import { User } from "src/entity/user.entity";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersService } from "src/users/users.service";
import { LocalStrategy } from "./local.authentication";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    User,
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => {
        return {
          secret: "secretKey",
          signOptions: { expiresIn: "1h" },
        };
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User]),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    UsersService,
    LocalStrategy,
    PassportModule,
  ],
})
export class AuthenticationModule {}
