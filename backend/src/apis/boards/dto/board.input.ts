export class GetBoardInput {
  boardNumber!: number;
}

export class CreateBoardInput {
  author!: string;
  title!: string;
  content!: string;
}

export class UpdateBoardInput {
  boardNumber!: number;
  title?: string;
  content?: string;
}

export class DeleteBoardInput {
  boardNumber!: number;
}
