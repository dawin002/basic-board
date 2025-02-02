import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const app = express();

app.use(express.json());

app.get('/boards', function (req, res) {
    // DB에서 데이터 꺼내오기
    const result = [
        {
            number: 1,
            writer: '다윈',
            title: '제목1',
            contents: '1번 글의 내용입니다.',
        },
        {
            number: 2,
            writer: '철수',
            title: '제목2',
            contents: '2번 글의 내용입니다.',
        },
        {
            number: 3,
            writer: '수지',
            title: '제목3',
            contents: '3번 글의 내용입니다.',
        },
    ];

    // 요청한 데이터 응답하기
    res.send(result);
});

app.post('/boards', function (req, res) {
    // 요청 확인하기
    console.log(req.body);
    // DB에 저장

    // DB 저장 결과 응답하기
    res.send('posted');
});

app.put('/boards', function (req, res) {
    // 요청 확인하기

    // DB에 수정

    // DB 수정 결과 응답
    res.send('updated');
});

app.delete('/boards', function (req, res) {
    // 데이터 받기

    // DB에서 삭제 처리(가짜 삭제)

    // DB 삭제 결과 응답
    res.send('deleted');
});

app.listen(3000);
