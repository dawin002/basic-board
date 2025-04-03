import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBoardInput {
  @IsString()
  @IsNotEmpty({ message: '작성자를 입력해야 합니다.' })
  author!: string;

  @IsString()
  @IsNotEmpty({ message: '제목을 입력해야 합니다.' })
  title!: string;

  @IsString()
  @IsNotEmpty({ message: '본문을 입력해야 합니다.' })
  content!: string;
}
