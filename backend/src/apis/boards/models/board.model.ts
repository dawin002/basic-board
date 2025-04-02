import mongoose, { Document, Model } from 'mongoose';

const boardSchema = new mongoose.Schema({
  number: { type: Number, unique: true },
  author: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
});

// Document 타입 정의
export interface BoardDocument extends Document {
  number: number;
  author: string;
  title: string;
  content: string;
  createdAt: Date;
  deletedAt?: Date | null;
}

// 모델 타입 정의
export const Board: Model<BoardDocument> = mongoose.model<BoardDocument>('Board', boardSchema);
