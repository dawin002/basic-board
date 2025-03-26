import { Board } from './models/board.model.js';

export class BoardsService {
  async getBoards() {
    return await Board.find({ deletedAt: null });
  }

  async getBoardById(boardNumber) {
    return await Board.findOne({
      number: boardNumber,
      deletedAt: null,
    });
  }

  async createBoard(author, title, content) {
    const newBoard = new Board({
      number: (await Board.countDocuments()) + 1,
      author,
      title,
      content,
      createdAt: new Date(),
      deletedAt: null,
    });

    return await newBoard.save();
  }

  updateBoard(boardNumber, updateFields) {
    const board = this.getBoardById(boardNumber);
    if (!board) {
      return { success: false, message: '게시글을 찾을 수 없습니다.' };
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
      return { success: false, message: '수정된 내용이 없습니다.' };
    }

    const updatedBoard = { ...board, ...changes };
    board.title = updatedBoard.title;
    board.content = updatedBoard.content;

    return { success: true, updatedBoard };
  }

  deleteBoard(boardNumber) {
    const board = this.getBoardById(boardNumber);
    if (!board) return false;

    board.deletedAt = new Date();
    return true;
  }
}
