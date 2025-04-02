import { GetBoardInput, CreateBoardInput, UpdateBoardInput, DeleteBoardInput } from '../dto/board.input';

export interface IBoardsServiceGet {
  getBoardInput: GetBoardInput;
}

export interface IBoardsServiceCreate {
  createBoardInput: CreateBoardInput;
}

export interface IBoardsServiceUpdate {
  updateBoardInput: UpdateBoardInput;
}

export interface IBoardServiceDelete {
  deleteBoardInput: DeleteBoardInput;
}
