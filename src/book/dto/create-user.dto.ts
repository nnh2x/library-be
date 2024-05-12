import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  password: string;
}
