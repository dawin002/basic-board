import { BoardDocument } from '../models/board.model';

export class UpdateBoardOutput {
  success!: boolean;
  message?: string;
  board?: BoardDocument;
}
