import express from 'express';

const app = express();

app.use(express.json());

app.get('/boards', function (req, res) {
    // 요청한 데이터 확인

    // DB에서 데이터 꺼내오기
    const result = [{}, {}, {}];

    // 요청한 데이터 응답하기
    res.send(result);
});

app.post('/boards', function (req, res) {
    // 데이터 받기

    // DB에 저장

    // DB 저장 결과 응답하기
    res.send('posted');
});

app.put('/boards', function (req, res) {
    // 데이터 받기

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
