import express from 'express';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';

const router = express.Router();
const boardsService = new BoardsService();
const boardsController = new BoardsController(boardsService);

router.get('/', (req, res) => boardsController.getAllBoards(req, res));
router.get('/:number', (req, res) => boardsController.getBoardByNumber(req, res));
router.post('/', (req, res) => boardsController.createBoard(req, res));
router.patch('/:number', (req, res) => boardsController.updateBoard(req, res));
router.delete('/:number', (req, res) => boardsController.deleteBoard(req, res));

export default router;
