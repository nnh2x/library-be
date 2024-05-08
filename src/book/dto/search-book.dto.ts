import { IsString, IsOptional } from 'class-validator';

export class SearchBookQuery {
  @IsString()
  @IsOptional()
  search?: string;

  @IsString()
  @IsOptional()
  author?: string;

  @IsString()
  @IsOptional()
  category?: string;
}
