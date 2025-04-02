import { Request, Response } from 'express';
import { BoardsService } from './boards.service';
import { GetBoardInput, CreateBoardInput, UpdateBoardInput, DeleteBoardInput } from './dto/board.input';

export class BoardsController {
  constructor(
    private readonly boardsService: BoardsService, //
  ) {}

  async getAllBoards(req: Request, res: Response): Promise<void> {
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

  async getBoardByNumber(req: Request, res: Response): Promise<void> {
    try {
      const getBoardInput: GetBoardInput = { boardNumber: parseInt(req.params.number) };
      const board = await this.boardsService.getBoardByNumber({ getBoardInput });
      if (!board) {
        console.log('게시글을 찾을 수 없습니다.');
        res.status(404).send({ message: '게시글을 찾을 수 없습니다.' });
        return;
      }
      console.log('게시글을 성공적으로 가져왔습니다.');
      console.log(board);
      res.status(200).send(board);
    } catch (error) {
      console.error('게시글을 가져올 수 없습니다.', error);
      res.status(500).send({ message: '게시글을 가져올 수 없습니다.' });
    }
  }

  async createBoard(req: Request, res: Response): Promise<void> {
    try {
      const createBoardInput: CreateBoardInput = req.body;
      if (!createBoardInput.author.trim()) {
        res.status(400).send({ message: '작성자를 입력해야 합니다.' });
        return;
      }
      if (!createBoardInput.title.trim()) {
        res.status(400).send({ message: '제목을 입력해야 합니다.' });
        return;
      }
      if (!createBoardInput.content.trim()) {
        res.status(400).send({ message: '본문을 입력해야 합니다.' });
        return;
      }
      const newBoard = await this.boardsService.createBoard({ createBoardInput });
      console.log('게시글이 성공적으로 등록되었습니다.');
      res.status(201).send({ message: '게시글이 등록되었습니다.', board: newBoard });
    } catch (error) {
      console.error('게시글을 등록하는 중 오류가 발생했습니다.', error);
      res.status(500).send({ message: '게시글을 등록하는 중 오류가 발생했습니다.' });
    }
  }

  async updateBoard(req: Request, res: Response): Promise<void> {
    try {
      const boardNumber = parseInt(req.params.number);
      const updateBoardInput: UpdateBoardInput = { boardNumber, ...req.body };
      // 서비스에 비즈니스 로직 위임
      const { success, message, board } = await this.boardsService.updateBoard({ updateBoardInput });

      if (!success) {
        res.status(400).send({ message });
        return;
      }
      res.status(200).send({
        message: '게시글이 수정되었습니다.',
        board,
      });
    } catch (error) {
      console.error('게시글을 수정하는 중 오류가 발생했습니다.', error);
      res.status(500).send({ message: '게시글을 수정하는 중 오류가 발생했습니다.' });
    }
  }

  async deleteBoard(req: Request, res: Response): Promise<void> {
    try {
      const boardNumber = parseInt(req.params.number);
      const deleteBoardInput: DeleteBoardInput = { boardNumber };
      const deleted = await this.boardsService.deleteBoard({ deleteBoardInput });
      if (!deleted) {
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
