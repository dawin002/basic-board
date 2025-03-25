export class BoardsService {
  constructor(boardsModel) {
    this.boardsModel = boardsModel;
    this.boards = boardsModel.boards;
  }

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

  updateBoard(boardNumber, title, content) {
    const board = this.getBoardById(boardNumber);
    if (!board) return null;

    board.title = title;
    board.content = content;
    return board;
  }

  deleteBoard(boardNumber) {
    const board = this.getBoardById(boardNumber);
    if (!board) return false;

    board.deletedAt = new Date();
    return true;
  }
}
