import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    mongoose.set('debug', true);
    if (!process.env.DB_URL) {
      throw new Error('환경변수 URL이 설정되어 있지 않습니다.');
    }
    await mongoose.connect(process.env.DB_URL);
    console.log('DB 접속 성공');
  } catch (error) {
    console.error('DB 접속 실패', error);
  }
};
