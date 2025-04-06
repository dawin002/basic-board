import { CreateBoardInput } from '../dto/create-board.input';

export const validateCreateBoardInput = function (input: CreateBoardInput): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (input.author !== undefined && input.author.trim() === '') {
    errors.push('작성자를 입력해주세요.');
  }

  if (input.title !== undefined && input.title.trim() === '') {
    errors.push('제목을 입력해주세요.');
  }

  if (input.content !== undefined && input.content.trim() === '') {
    errors.push('본문을 입력해주세요.');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};
