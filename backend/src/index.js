import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

import { options } from '../swagger/config.js';

const app = express();
const swaggerSpec = swaggerJsdoc(options);

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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

    // 요청한 데이터 응답하기
    res.send(result);
});

app.get('/board', function (req, res) {
    // 요청 확인하기
    console.log(req.body);

    // DB에서 데이터 꺼내기
    result = boards[req.body.number];

    // 요청한 데이터 응답하기
    res.send(result);
});

app.post('/board', function (req, res) {
    // 요청 확인하기
    console.log(req.body);
    // DB에 저장

    // DB 저장 결과 응답하기
    res.send('posted');
});

app.put('/board', function (req, res) {
    // 요청 확인하기

    // DB에 수정

    // DB 수정 결과 응답
    res.send('updated');
});

app.delete('/board', function (req, res) {
    // 데이터 받기

    // DB에서 삭제 처리(가짜 삭제)

    // DB 삭제 결과 응답
    res.send('deleted');
});

app.listen(3000);
