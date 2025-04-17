import 'dotenv/config';
import app from './app';

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`서버가 ${PORT}번 포트에서 실행 중입니다.`);
});
