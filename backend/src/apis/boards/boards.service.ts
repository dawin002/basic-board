import { Board, BoardDocument } from './models/board.model';
import {
  IBoardServiceDelete,
  IBoardsServiceCreate,
  IBoardsServiceGet,
  IBoardsServiceUpdate,
} from './interfaces/boards-service.interface';

export class BoardsService {
  async getBoards(): Promise<BoardDocument[]> {
    try {
      const boards = await Board.find({ deletedAt: null });
      return boards;
    } catch (error) {
      console.error('[DB 에러] 게시글을 가져오는 중 오류가 발생했습니다:', error);
      throw new Error('게시글을 가져오는 중 오류가 발생했습니다.');
    }
  }

  async getBoardByNumber({ getBoardInput }: IBoardsServiceGet): Promise<BoardDocument | null> {
    try {
      const board = await Board.findOne({ number: getBoardInput.boardNumber, deletedAt: null });
      return board;
    } catch (error) {
      console.error('[DB 에러] 게시글을 가져오는 중 오류가 발생했습니다:', error);
      throw new Error('게시글을 가져오는 중 오류가 발생했습니다.');
    }
  }

  async createBoard({ createBoardInput }: IBoardsServiceCreate): Promise<BoardDocument> {
    try {
      const newBoard = new Board({
        number: (await Board.countDocuments()) + 1,
        author: createBoardInput.author,
        title: createBoardInput.title,
        content: createBoardInput.content,
        createdAt: new Date(),
        deletedAt: null,
      });

      return await newBoard.save();
    } catch (error) {
      console.error('[DB 에러] 게시글을 등록하는 중 오류가 발생했습니다:', error);
      throw new Error('게시글을 등록하는 중 오류가 발생했습니다.');
    }
  }

  async updateBoard(
    { updateBoardInput }: IBoardsServiceUpdate, //
  ): Promise<{ success: boolean; message?: string; board?: BoardDocument }> {
    try {
      const board = await Board.findOne({ number: updateBoardInput.boardNumber, deletedAt: null });

      if (!board) {
        return { success: false, message: '게시글을 찾을 수 없습니다.' };
      }

      const { title, content } = updateBoardInput;
      const newTitle = title?.trim();
      const newContent = content?.trim();

      if (!newTitle || !newContent) {
        return { success: false, message: !newTitle ? '제목을 입력해야 합니다.' : '본문을 입력해야 합니다.' };
      }

      const changes: Partial<BoardDocument> = {};
      if (newTitle !== board.title) changes.title = newTitle;
      if (newContent !== board.content) changes.content = newContent;

      if (Object.keys(changes).length === 0) {
        return { success: false, message: '수정된 내용이 없습니다.' };
      }

      Object.assign(board, changes);
      const updatedBoard = await board.save();
      return { success: true, board: updatedBoard };
    } catch (error) {
      console.error('[DB 에러] 게시글을 수정하는 중 오류가 발생했습니다:', error);
      throw new Error('게시글을 수정하는 중 오류가 발생했습니다.');
    }
  }

  async deleteBoard({ deleteBoardInput }: IBoardServiceDelete): Promise<boolean> {
    try {
      const board = await Board.findOne({ number: deleteBoardInput.boardNumber, deletedAt: null });
      if (!board) return false;
      board.deletedAt = new Date();
      await board.save();
      return true;
    } catch (error) {
      console.error('[DB 에러] 게시글을 등록하는 중 오류가 발생했습니다:', error);
      throw new Error('게시글을 등록하는 중 오류가 발생했습니다.');
    }
  }
}
