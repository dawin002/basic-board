import Board from './models/board.model.js';

export class BoardsService {
  getBoards() {
    return this.boards.filter((board) => board.deletedAt === null);
  }

  getBoardById(boardNumber) {
    return this.boards.find((board) => board.number === boardNumber && board.deletedAt === null);
  }

  createBoard(author, title, content) {
    const newBoard = {
      number: this.boards.length + 1,
      author,
      title,
      content,
      createdAt: new Date(),
      deletedAt: null,
    };
    this.boards.push(newBoard);
    return newBoard;
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

    // 기존 객체를 직접 수정하지 않고 새로운 객체 생성
    const updatedBoard = { ...board, ...changes };
    board.title = updatedBoard.title;
    board.content = updatedBoard.content;

    return { success: true, updatedBoard };
  }

  ////////////// 여기 아직 안고침 고쳐야됨 여기부터
  deleteBoard(boardNumber) {
    const board = this.getBoardById(boardNumber);
    if (!board) return false;

    board.deletedAt = new Date();
    return true;
  }
}
