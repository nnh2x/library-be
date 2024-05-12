import { IsString, IsOptional, IsEnum, IsArray } from "class-validator";
export enum SortOrder {
  ASC = "ASC",
  DESC = "DESC",
}
export class SearchBookQuery {
  @IsString()
  @IsOptional()
  search?: string;

  @IsString()
  @IsOptional()
  author?: string;

  @IsArray()
  @IsOptional()
  category_ids: string[];

  page_index: number;

  page_size: number;

  @IsOptional()
  public orderBy?: string;

  @IsEnum(SortOrder)
  @IsOptional()
  public sortOrder?: SortOrder = SortOrder.DESC;

  // Brrows ASC DESC
}
