import { Request, Response } from 'express';
import { BoardsService } from './boards.service';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { GetBoardByNumberInput } from './dto/get-board-by-number.input';
import { CreateBoardInput } from './dto/create-board.input';
import { UpdateBoardInput } from './dto/update-board.input';
import { DeleteBoardInput } from './dto/delete-board.input';

export class BoardsController {
  constructor(
    private readonly boardsService: BoardsService, //
  ) {}

  async getAllBoards(req: Request, res: Response): Promise<void> {
    try {
      const { boards } = await this.boardsService.getBoards();

      console.log('게시글을 성공적으로 가져왔습니다.\n', boards);
      res.status(200).send(boards);
    } catch (error) {
      console.error('게시글을 가져올 수 없습니다.', error);
      res.status(500).send({ message: '게시글을 가져올 수 없습니다.' });
    }
  }

  async getBoardByNumber(req: Request, res: Response): Promise<void> {
    try {
      const getBoardByNumberInput = plainToInstance(GetBoardByNumberInput, {
        boardNumber: parseInt(req.params.number),
      });

      const { board } = await this.boardsService.getBoardByNumber(getBoardByNumberInput);

      if (!board) {
        console.log('게시글을 찾을 수 없습니다.');
        res.status(404).send({ message: '게시글을 찾을 수 없습니다.' });
        return;
      }

      console.log('게시글을 성공적으로 가져왔습니다.\n', board);
      res.status(200).send(board);
    } catch (error) {
      console.error('게시글을 가져올 수 없습니다.', error);
      res.status(500).send({ message: '게시글을 가져올 수 없습니다.' });
    }
  }

  async createBoard(req: Request, res: Response): Promise<void> {
    try {
      const createBoardInput = plainToInstance(CreateBoardInput, req.body);
      const errors = await validate(createBoardInput);
      if (errors.length > 0) {
        res.status(400).send({ message: '입력값이 유효하지 않습니다.', errors });
        return;
      }

      const { board } = await this.boardsService.createBoard(createBoardInput);

      console.log('게시글이 성공적으로 등록되었습니다.\n', board);
      res.status(201).send({ message: '게시글이 등록되었습니다.', board });
    } catch (error) {
      console.error('게시글을 등록하는 중 오류가 발생했습니다.', error);
      res.status(500).send({ message: '게시글을 등록하는 중 오류가 발생했습니다.' });
    }
  }

  async updateBoard(req: Request, res: Response): Promise<void> {
    try {
      const updateBoardInput = plainToInstance(UpdateBoardInput, {
        boardNumber: req.params.number,
        ...req.body,
      });

      const errors = await validate(updateBoardInput);
      if (errors.length > 0) {
        res.status(400).send({ message: '입력값이 유효하지 않습니다.', errors });
        return;
      }

      const { success, message, board } = await this.boardsService.updateBoard(updateBoardInput);

      if (!success) {
        console.log(message);
        res.status(400).send({ message });
        return;
      }

      console.log('게시글이 수정되었습니다.\n', board);
      res.status(200).send({ message: '게시글이 수정되었습니다.', board });
    } catch (error) {
      console.error('게시글을 수정하는 중 오류가 발생했습니다.', error);
      res.status(500).send({ message: '게시글을 수정하는 중 오류가 발생했습니다.' });
    }
  }

  async deleteBoard(req: Request, res: Response): Promise<void> {
    try {
      const deleteBoardInput = plainToInstance(DeleteBoardInput, {
        boardNumber: parseInt(req.params.number),
      });

      const { isDeleted } = await this.boardsService.deleteBoard(deleteBoardInput);

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
