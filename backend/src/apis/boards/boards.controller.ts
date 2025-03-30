export class BoardsController {
  boardsService;

  constructor(boardsService) {
    this.boardsService = boardsService;
  }

  async getAllBoards(req, res) {
    try {
      // DB에서 데이터 꺼내오기
      const boards = await this.boardsService.getBoards();

      console.log('게시글을 성공적으로 가져왔습니다.');
      console.log(boards);

      res.status(200).send(boards);
    } catch (error) {
      console.error('게시글을 가져올 수 없습니다.', error);
      res.status(500).send({ message: '게시글을 가져올 수 없습니다.' });
    }
  }

  async getBoardById(req, res) {
    try {
      const board = await this.boardsService.getBoardById(parseInt(req.params.number));
      if (board) {
        console.log('게시글을 성공적으로 가져왔습니다.');
        console.log(board);
        res.status(200).send(board);
      } else {
        console.log('게시글을 찾을 수 없습니다.');
        res.status(404).send({ message: '게시글을 찾을 수 없습니다.' });
      }
    } catch (error) {
      console.error('게시글을 가져올 수 없습니다.', error);
      res.status(500).send({ message: '게시글을 가져올 수 없습니다.' });
    }
  }

  async createBoard(req, res) {
    try {
      const { author, title, content } = req.body;

      if (!author.trim()) {
        return res.status(400).send({ message: '작성자를 입력해야 합니다.' });
      }

      if (!title.trim()) {
        return res.status(400).send({ message: '제목을 입력해야 합니다.' });
      }

      if (!content.trim()) {
        return res.status(400).send({ message: '본문을 입력해야 합니다.' });
      }

      const newBoard = await this.boardsService.createBoard(author, title, content);

      console.log('게시글이 성공적으로 등록되었습니다.');
      res.status(201).send({ message: '게시글이 등록되었습니다.', board: newBoard });
    } catch (error) {
      console.error('게시글을 등록하는 중 오류가 발생했습니다.', error);
      res.status(500).send({ message: '게시글을 등록하는 중 오류가 발생했습니다.' });
    }
  }

  async updateBoard(req, res) {
    try {
      const boardNumber = parseInt(req.params.number);
      const updateFields = req.body; // 수정할 필드들

      console.log(updateFields);

      // 서비스에 비즈니스 로직 위임
      const { success, message, updatedBoard } = await this.boardsService.updateBoard(boardNumber, updateFields);

      if (!success) {
        return res.status(400).send({ message });
      }

      res.status(200).send({
        message: '게시글이 수정되었습니다.',
        board: updatedBoard,
      });
    } catch (error) {
      console.error('게시글을 수정하는 중 오류가 발생했습니다.', error);
      res.status(500).send({ message: '게시글을 수정하는 중 오류가 발생했습니다.' });
    }
  }

  async deleteBoard(req, res) {
    try {
      const boardNumber = parseInt(req.params.number);
      const deleted = await this.boardsService.deleteBoard(boardNumber);

      if (deleted) {
        console.log('게시글이 성공적으로 삭제되었습니다.');
        res.status(204).send(); // No Content 응답 (본문 없이 상태 코드만)
      } else {
        console.log('게시글을 찾을 수 없습니다.');
        res.status(404).send({ message: '게시글을 찾을 수 없습니다.' });
      }
    } catch (error) {
      console.error('게시글을 삭제하는 중 오류가 발생했습니다.', error);
      res.status(500).send({ message: '게시글을 삭제하는 중 오류가 발생했습니다.' });
    }
  }
}
