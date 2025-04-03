import { BoardDocument } from '../models/board.model';

export class GetBoardByNumberInput {
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

export class GetBoardsOutput {
  boards?: BoardDocument[];
}

export class GetBoardByNumberOutput {
  board?: BoardDocument | null;
}

export class CreateBoardOutput {
  board!: BoardDocument;
}

export class UpdateBoardOutput {
  success!: boolean;
  message?: string;
  board?: BoardDocument;
}

export class DeleteBoardOutput {
  isDeleted!: boolean;
}
