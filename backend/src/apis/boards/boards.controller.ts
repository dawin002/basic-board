import { Request, Response } from 'express';
import { BoardsService } from './boards.service';

export class BoardsController {
  constructor(
    private readonly boardsService: BoardsService, //
  ) {}

  async getAllBoards(req: Request, res: Response): Promise<void> {
    try {
      // DB에서 데이터 꺼내오기
      const { boards } = await this.boardsService.getBoards();
      console.log('게시글을 성공적으로 가져왔습니다.');
      console.log(boards);
      res.status(200).send(boards);
    } catch (error) {
      console.error('게시글을 가져올 수 없습니다.', error);
      res.status(500).send({ message: '게시글을 가져올 수 없습니다.' });
    }
  }

  async getBoardByNumber(req: Request, res: Response): Promise<void> {
    try {
      const getBoardByNumberOutput = await this.boardsService.getBoardByNumber({
        boardNumber: parseInt(req.params.number),
      });
      if (!getBoardByNumberOutput.board) {
        console.log('게시글을 찾을 수 없습니다.');
        res.status(404).send({ message: '게시글을 찾을 수 없습니다.' });
        return;
      }
      console.log('게시글을 성공적으로 가져왔습니다.');
      console.log(getBoardByNumberOutput.board);
      res.status(200).send(getBoardByNumberOutput.board);
    } catch (error) {
      console.error('게시글을 가져올 수 없습니다.', error);
      res.status(500).send({ message: '게시글을 가져올 수 없습니다.' });
    }
  }

  async createBoard(req: Request, res: Response): Promise<void> {
    try {
      const { author, title, content } = req.body;
      if (!author.trim()) {
        res.status(400).send({ message: '작성자를 입력해야 합니다.' });
        return;
      }
      if (!title.trim()) {
        res.status(400).send({ message: '제목을 입력해야 합니다.' });
        return;
      }
      if (!content.trim()) {
        res.status(400).send({ message: '본문을 입력해야 합니다.' });
        return;
      }
      const createBoardOutput = await this.boardsService.createBoard({ author, title, content });
      console.log('게시글이 성공적으로 등록되었습니다.');
      res.status(201).send({ message: '게시글이 등록되었습니다.', board: createBoardOutput.board });
    } catch (error) {
      console.error('게시글을 등록하는 중 오류가 발생했습니다.', error);
      res.status(500).send({ message: '게시글을 등록하는 중 오류가 발생했습니다.' });
    }
  }

  async updateBoard(req: Request, res: Response): Promise<void> {
    try {
      const boardNumber = parseInt(req.params.number);
      // 서비스에 비즈니스 로직 위임
      const { success, message, board } = await this.boardsService.updateBoard({ boardNumber, ...req.body });

      if (!success) {
        res.status(400).send({ message });
        return;
      }
      res.status(200).send({
        message: '게시글이 수정되었습니다.',
        board: board,
      });
    } catch (error) {
      console.error('게시글을 수정하는 중 오류가 발생했습니다.', error);
      res.status(500).send({ message: '게시글을 수정하는 중 오류가 발생했습니다.' });
    }
  }

  async deleteBoard(req: Request, res: Response): Promise<void> {
    try {
      const boardNumber = parseInt(req.params.number);
      const { isDeleted } = await this.boardsService.deleteBoard({ boardNumber });
      if (!isDeleted) {
        console.log('게시글을 찾을 수 없습니다.');
        res.status(404).send({ message: '게시글을 찾을 수 없습니다.' });
        return;
      }
      console.log('게시글이 성공적으로 삭제되었습니다.');
      res.status(204).send(); // No Content 응답 (본문 없이 상태 코드만)
    } catch (error) {
      console.error('게시글을 삭제하는 중 오류가 발생했습니다.', error);
      res.status(500).send({ message: '게시글을 삭제하는 중 오류가 발생했습니다.' });
    }
  }
}
