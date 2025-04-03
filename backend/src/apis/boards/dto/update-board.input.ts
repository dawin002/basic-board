import { IsString, IsInt, IsOptional } from 'class-validator';

export class UpdateBoardInput {
  @IsInt()
  boardNumber!: number;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  content?: string;
}
