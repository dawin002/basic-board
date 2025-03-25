import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://my-database:27017/basicBoard');
    console.log('DB 접속 성공');
  } catch (error) {
    console.error('DB 접속 실패', error);
  }
};
