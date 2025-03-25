import express from 'express';
import cors from 'cors';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express'; // 🔹 빠진 부분 추가
import { options } from '../swagger/config.js';
import { connectDB } from './config/db.js';
import boardsRouter from './apis/boards/boards.routes.js';

const app = express();
const swaggerSpec = swaggerJsdoc(options);

connectDB();

app.use(express.json());
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 라우터 등록
app.use('/api/boards', boardsRouter);

export default app;
