import { CreateBoardInput } from './dto/create-board.input';
import { CreateBoardOutput } from './dto/create-board.output';
import { DeleteBoardInput } from './dto/delete-board.input';
import { DeleteBoardOutput } from './dto/delete-board.output';
import { GetBoardByNumberInput } from './dto/get-board-by-number.input';
import { GetBoardByNumberOutput } from './dto/get-board-by-number.output';
import { GetBoardsOutput } from './dto/get-boards.output';
import { UpdateBoardInput } from './dto/update-board.input';
import { UpdateBoardOutput } from './dto/update-board.output';
import { Board, BoardDocument } from './models/board.model';
import { Counter } from './models/counter.model';
import { CustomError } from '../common/errors/customError';

export class BoardsService {
  async getBoards(): Promise<GetBoardsOutput> {
    try {
      const boards = await Board.find({ deletedAt: null });
      return { boards };
    } catch (error) {
      console.error('[DB 에러] 게시글을 가져오는 중 오류가 발생했습니다:', error);
      throw new CustomError(500, '게시글을 가져오는 중 오류가 발생했습니다.');
    }
  }

  async getBoardByNumber({ boardNumber }: GetBoardByNumberInput): Promise<GetBoardByNumberOutput> {
    try {
      const board = await Board.findOne({ number: boardNumber, deletedAt: null });

      if (!board) {
        throw new CustomError(404, '게시글을 찾을 수 없습니다.');
      }

      return { board };
    } catch (error) {
      if (error instanceof CustomError) throw error;

      console.error('[DB 에러] 게시글을 가져오는 중 오류가 발생했습니다:', error);
      throw new CustomError(500, '게시글을 가져오는 중 오류가 발생했습니다.');
    }
  }

  async createBoard({ author, title, content }: CreateBoardInput): Promise<CreateBoardOutput> {
    try {
      const boardNumber = await this.getNewBoardNumber();
      const newBoard = new Board({
        number: boardNumber,
        author,
        title,
        content,
        createdAt: new Date(),
        deletedAt: null,
      });
      const board = await newBoard.save();
      return { board };
    } catch (error) {
      console.error('[DB 에러] 게시글을 등록하는 중 오류가 발생했습니다:', error);
      throw new Error('게시글을 등록하는 중 오류가 발생했습니다.');
    }
  }

  async updateBoard({ boardNumber, title, content }: UpdateBoardInput): Promise<UpdateBoardOutput> {
    try {
      const board = await Board.findOne({ number: boardNumber, deletedAt: null });

      if (!board) {
        return { success: false, message: '게시글을 찾을 수 없습니다.' };
      }

      const newTitle = title?.trim();
      const newContent = content?.trim();

      const changes: Partial<BoardDocument> = {};
      if (newTitle !== undefined && newTitle !== board.title) changes.title = newTitle;
      if (newContent !== undefined && newContent !== board.content) changes.content = newContent;

      if (Object.keys(changes).length === 0) {
        return { success: false, board, message: '수정된 내용이 없습니다.' };
      }

      Object.assign(board, changes);
      const updatedBoard = await board.save();
      return { success: true, board: updatedBoard };
    } catch (error) {
      console.error('[DB 에러] 게시글을 수정하는 중 오류가 발생했습니다:', error);
      throw new Error('게시글을 수정하는 중 오류가 발생했습니다.');
    }
  }

  async deleteBoard({ boardNumber }: DeleteBoardInput): Promise<DeleteBoardOutput> {
    try {
      const board = await Board.findOne({ number: boardNumber, deletedAt: null });
      if (!board) return { isDeleted: false };

      board.deletedAt = new Date();
      await board.save();
      return { isDeleted: true };
    } catch (error) {
      console.error('[DB 에러] 게시글을 삭제하는 중 오류가 발생했습니다:', error);
      throw new Error('게시글을 삭제하는 중 오류가 발생했습니다.');
    }
  }

  async getNewBoardNumber(): Promise<number> {
    try {
      const counter = await Counter.findOneAndUpdate(
        { name: 'board' }, //
        { $inc: { count: 1 } },
        { new: true, upsert: true },
      );
      return counter.count;
    } catch (error) {
      console.log('[DB 에러] 새로운 게시글 번호를 할당할 수 없습니다.');
      throw new Error('[DB 에러] 새로운 게시글 번호를 할당할 수 없습니다.');
    }
  }
}
