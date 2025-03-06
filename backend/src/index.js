import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import cors from 'cors';

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
        createdAt: new Date('2025-01-01T09:30:00+09:00'),
    },
    {
        number: 2,
        author: '창훈',
        title: '다윈아 뭐하니!',
        content: '다윈아 뭐해! 술먹자!',
        createdAt: new Date('2025-01-02T19:00:00+09:00'),
    },
    {
        number: 3,
        author: '수지',
        title: '나도 껴줘',
        content: '술 먹을 거면 나도 껴주라!',
        createdAt: new Date('2025-01-02T20:30:00+09:00'),
    },
];

app.get('/boards', function (req, res) {
    // DB에서 데이터 꺼내오기
    const result = boards;

    console.log(result);

    // 요청한 데이터 응답하기
    res.status(200).send(result);
});

app.get('/board/:number', function (req, res) {
    // 요청 확인하기
    console.log(req.params);

    const boardNumber = parseInt(req.params.number);

    // DB에서 데이터 꺼내기
    const board = boards.find((b) => b.number === boardNumber);

    // 요청한 데이터 응답하기
    if (board) {
        console.log(board);
        res.status(200).send(board);
    } else {
        console.log('게시글을 찾을 수 없습니다.');
        res.status(404).send({ message: '게시글을 찾을 수 없습니다.' });
    }
});

////////////////////////////////////////////////////////
////////// 응답 상태코드 고려해서 잘 받게 프론트 수정
////////// 그리고 나서 모든 api 내에 try catch 문 넣는 것 고려하기
////////// 화면 전환 구현

app.post('/board', function (req, res) {
    // 요청 확인하기
    console.log(req.body);
    const { author, title, content } = req.body;

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
    };

    boards.push(newBoard);

    // DB 저장 결과 응답하기
    res.status(201).send({
        message: '게시글이 성공적으로 등록되었습니다.',
        board: newBoard,
    });
});

app.patch('/board/:number', function (req, res) {
    // 요청 확인하기
    console.log(req.params);
    console.log(req.body);

    const boardNumber = parseInt(req.params.number);
    const boardIndex = boards.findIndex((b) => b.number === boardNumber);

    if (boardIndex === -1) {
        return res.status(404).send({ message: '게시글을 찾을 수 없습니다.' });
    }

    const existingBoard = boards[boardIndex];

    const updatedBoard = { ...existingBoard, ...req.body };

    // DB에 수정
    boards[boardIndex] = updatedBoard;

    console.log('게시글이 성공적으로 수정되었습니다.', updatedBoard);
    // DB 수정 결과 응답
    res.status(200).send({
        message: '게시글이 성공적으로 수정되었습니다.',
        board: updatedBoard,
    });
});

app.delete('/board', function (req, res) {
    // 데이터 받기

    // DB에서 삭제 처리(가짜 삭제)

    // DB 삭제 결과 응답
    res.status(204).send('deleted');
});

app.listen(3000);
