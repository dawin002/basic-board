import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import cors from 'cors';
import mongoose from 'mongoose';

import { options } from '../swagger/config.js';

const app = express();
const swaggerSpec = swaggerJsdoc(options);

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(cors());

// 더미 데이터
const boards = [
  {
    number: 1,
    author: '다윈',
    title: '안녕하세요!',
    content: '최초의 게시글입니다.',
    createdAt: new Date('2025-03-01T09:30:00+09:00'),
    deletedAt: null,
  },
  {
    number: 2,
    author: '창훈',
    title: '다윈아 뭐하니!',
    content: '다윈아 뭐해! 술먹자!',
    createdAt: new Date('2025-03-02T19:00:00+09:00'),
    deletedAt: null,
  },
  {
    number: 3,
    author: '수지',
    title: '나도 껴줘',
    content: '술 먹을 거면 나도 껴주라!',
    createdAt: new Date('2025-03-02T20:30:00+09:00'),
    deletedAt: null,
  },
  {
    number: 4,
    author: '삭제',
    title: '삭제된 글',
    content: '이건 삭제된 글이에요',
    createdAt: new Date('2025-03-20T20:30:00+09:00'),
    deletedAt: new Date('2025-03-20T20:30:00+09:00'),
  },
];

app.get('/boards', function (req, res) {
  try {
    // DB에서 데이터 꺼내오기
    const result = boards.filter((board) => board.deletedAt === null);

    console.log('게시글을 성공적으로 가져왔습니다.');
    console.log(result);

    // 요청한 데이터 응답하기
    res.status(200).send(result);
  } catch (error) {
    console.error('게시글을 가져올 수 없습니다.', error);
    res.status(500).send({ message: '게시글을 가져올 수 없습니다.' });
  }
});

app.get('/board/:number', function (req, res) {
  try {
    // 요청 확인하기
    console.log(req.params);

    const boardNumber = parseInt(req.params.number);

    // DB에서 데이터 꺼내기
    const board = boards.find((board) => board.number === boardNumber && board.deletedAt === null);

    // 요청한 데이터 응답하기
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
});

app.post('/board', function (req, res) {
  try {
    // 요청 확인하기
    console.log(req.body);
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

    // 현재 boards 배열에서 가장 큰 number 값 찾기
    const maxNumber = boards.length > 0 ? Math.max(...boards.map((board) => board.number)) : 0;
    const newNumber = maxNumber + 1;

    // 새로운 게시글 객체 생성
    const newBoard = {
      number: newNumber,
      author,
      title,
      content,
      createdAt: new Date(),
      deletedAt: null,
    };

    boards.push(newBoard);

    console.log('게시글이 성공적으로 등록되었습니다.');
    console.log(newBoard);
    // DB 저장 결과 응답하기
    res.status(201).send({
      message: '게시글이 성공적으로 등록되었습니다.',
      board: newBoard,
    });
  } catch (error) {
    console.error('게시글을 등록하는 중 오류가 발생했습니다.', error);
    res.status(500).send({ message: '게시글을 등록하는 중 오류가 발생했습니다.' });
  }
});

app.patch('/board/:number', function (req, res) {
  try {
    // 요청 확인하기
    console.log(req.params);
    console.log(req.body);

    const boardNumber = parseInt(req.params.number);
    const boardIndex = boards.findIndex((board) => board.number === boardNumber && board.deletedAt === null);

    if (boardIndex === -1) {
      console.error('게시글을 찾을 수 없습니다.');
      return res.status(404).send({ message: '게시글을 찾을 수 없습니다.' });
    }

    const existingBoard = boards[boardIndex];

    const title = req.body.title !== undefined ? req.body.title.trim() : existingBoard.title;
    const content = req.body.content !== undefined ? req.body.content.trim() : existingBoard.content;

    if (!title) {
      return res.status(400).send({ message: '제목을 입력해야 합니다.' });
    }

    if (!content) {
      return res.status(400).send({ message: '본문을 입력해야 합니다.' });
    }

    const updatedBoard = { ...existingBoard, title, content };

    // DB에 수정
    boards[boardIndex] = updatedBoard;

    console.log('게시글이 성공적으로 수정되었습니다.');
    console.log(updatedBoard);
    // DB 수정 결과 응답
    res.status(200).send({
      message: '게시글이 성공적으로 수정되었습니다.',
      board: updatedBoard,
    });
  } catch (error) {
    console.error('게시글을 수정하는 중 오류가 발생했습니다.', error);
    res.status(500).send({ message: '게시글을 수정하는 중 오류가 발생했습니다.' });
  }
});

app.delete('/board/:boardNumber', function (req, res) {
  try {
    // 데이터 받기
    const boardNumber = parseInt(req.params.boardNumber);
    const boardIndex = boards.findIndex((board) => board.number === boardNumber && board.deletedAt === null);

    if (boardIndex === -1) {
      console.error('게시글을 찾을 수 없습니다.');
      return res.status(404).send({ message: '게시글을 찾을 수 없습니다.' });
    }

    // DB에서 삭제 처리(소프트 삭제)
    boards[boardIndex].deletedAt = new Date();

    console.log('게시글이 성공적으로 삭제되었습니다.', boards[boardIndex]);

    // DB 삭제 결과 응답
    res.status(204).send(); // 상태코드 204 응답에는 본문을 포함할 수 없음
  } catch (error) {
    console.error('게시글을 삭제하는 중 오류가 발생했습니다.', error);
    res.status(500).send({ message: '게시글을 삭제하는 중 오류가 발생했습니다.' });
  }
});

mongoose
  .connect('mongodb://my-database:27017/basicBoard')
  .then(() => console.log('db 접속 성공'))
  .catch(() => console.log('db 접속 실패'));

app.listen(3000);
