export class BoardsController {
  boardsService;

  constructor(boardsService) {
    this.boardsService = boardsService;
  }

  async getAllBoards(req, res) {
    const boards = await this.boardsService.getBoards();
    res.status(200).send(boards);
  }

  async getBoardById(req, res) {
    const board = await this.boardsService.getBoardById(parseInt(req.params.number));
    if (board) {
      res.status(200).send(board);
    } else {
      res.status(404).send({ message: '게시글을 찾을 수 없습니다.' });
    }
  }

  async createBoard(req, res) {
    const { author, title, content } = req.body;
    const newBoard = await this.boardsService.createBoard(author, title, content);
    res.status(201).send({ message: '게시글이 등록되었습니다.', board: newBoard });
  }

  async updateBoard(req, res) {
    const boardNumber = parseInt(req.params.number);
    const { title, content } = req.body;
    const updatedBoard = await this.boardsService.updateBoard(boardNumber, title, content);

    if (updatedBoard) {
      res.status(200).send({ message: '게시글이 수정되었습니다.', board: updatedBoard });
    } else {
      res.status(404).send({ message: '게시글을 찾을 수 없습니다.' });
    }
  }

  async deleteBoard(req, res) {
    const boardNumber = parseInt(req.params.number);
    const deleted = await this.boardsService.deleteBoard(boardNumber);

    if (deleted) {
      res.status(204).send(); // No Content 응답 (본문 없이 상태 코드만)
    } else {
      res.status(404).send({ message: '게시글을 찾을 수 없습니다.' });
    }
  }
}
