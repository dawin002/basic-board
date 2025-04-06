import { UpdateBoardInput } from '../dto/update-board.input';

export const validateUpdateBoardInput = function (input: UpdateBoardInput): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (input.title !== undefined && !input.title.trim()) {
    errors.push('제목을 입력해주세요.');
  }

  if (input.content !== undefined && !input.content.trim()) {
    errors.push('본문을 입력해주세요.');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};
