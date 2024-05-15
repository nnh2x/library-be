import { Module, } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookModule } from "./book/book.module";
import { UserModule } from "./user/user.module";
import { UsersModule } from "./users/users.module";
import { AuthenticationModule } from "./authentication/authentication.module";
import typeorm from "./config/typeorm";
import * as redisStore from "cache-manager-redis-store";
import { CacheModule } from "@nestjs/cache-manager";
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get("typeorm"),
    }),
    CacheModule.register({
      host: "localhost", //default host
      port: 6379, //default port
    }),
    BookModule,
    UserModule,
    UsersModule,
    AuthenticationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
