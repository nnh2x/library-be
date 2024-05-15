import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
async function bootstrap() {
  const port: number = 5200;
  await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.REDIS,
    options: {
      host: process.env.REDIS_HOST,
      port: +process.env.REDIS_PORT,
    },
  });
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
    logger: ["error", "warn"],
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const config = new DocumentBuilder()
    .setTitle("Api Documentation")
    .setDescription("The  API description")
    .setVersion("1.0")
    .addTag("student")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  await app.listen(port);
  console.log(`localhost:${port}`);
}
bootstrap();
