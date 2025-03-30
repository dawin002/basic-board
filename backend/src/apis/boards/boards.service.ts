import { Board } from './models/board.model.js';

export class BoardsService {
  async getBoards() {
    try {
      const boards = await Board.find({ deletedAt: null });
      return boards;
    } catch (error) {
      console.error('[DB 에러] 게시글을 가져오는 중 오류가 발생했습니다:', error);
      throw new Error('게시글을 가져오는 중 오류가 발생했습니다.');
    }
  }

  async getBoardById(boardNumber) {
    try {
      const board = await Board.findOne({
        number: boardNumber,
        deletedAt: null,
      });
      return board;
    } catch (error) {
      console.error('[DB 에러] 게시글을 가져오는 중 오류가 발생했습니다:', error);
      throw new Error('게시글을 가져오는 중 오류가 발생했습니다.');
    }
  }

  async createBoard(author, title, content) {
    try {
      const newBoard = new Board({
        number: (await Board.countDocuments()) + 1,
        author,
        title,
        content,
        createdAt: new Date(),
        deletedAt: null,
      });

      return await newBoard.save();
    } catch (error) {
      console.error('[DB 에러] 게시글을 등록하는 중 오류가 발생했습니다:', error);
      throw new Error('게시글을 등록하는 중 오류가 발생했습니다.');
    }
  }

  async updateBoard(boardNumber, updateFields) {
    try {
      const board = await Board.findOne({
        number: boardNumber,
        deletedAt: null,
      });

      if (!board) {
        return {
          success: false,
          message: '게시글을 찾을 수 없습니다.',
        };
      }

      const { newTitle, newContent } = updateFields;
      const title = newTitle?.trim();
      const content = newContent?.trim();

      if (!title || !content) {
        return {
          success: false,
          message: !title ? '제목을 입력해야 합니다.' : '본문을 입력해야 합니다.',
        };
      }

      const changes = {};
      if (title !== board.title) changes.title = title;
      if (content !== board.content) changes.content = content;

      if (Object.keys(changes).length === 0) {
        return {
          success: false,
          message: '수정된 내용이 없습니다.',
        };
      }

      Object.assign(board, changes);

      const updatedBoard = await board.save();

      return { success: true, board: updatedBoard };
    } catch (error) {
      console.error('[DB 에러] 게시글을 수정하는 중 오류가 발생했습니다:', error);
      throw new Error('게시글을 수정하는 중 오류가 발생했습니다.');
    }
  }

  async deleteBoard(boardNumber) {
    try {
      const board = await Board.findOne({
        number: boardNumber,
        deletedAt: null,
      });

      if (!board) return false;

      board.deletedAt = new Date();

      return await board.save();
    } catch (error) {
      console.error('[DB 에러] 게시글을 등록하는 중 오류가 발생했습니다:', error);
      throw new Error('게시글을 등록하는 중 오류가 발생했습니다.');
    }
  }
}
