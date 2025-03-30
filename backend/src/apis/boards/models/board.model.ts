import mongoose from 'mongoose';

const boardSchema = new mongoose.Schema({
  number: { type: Number, unique: true },
  author: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
});

export const Board = mongoose.model('Board', boardSchema);
