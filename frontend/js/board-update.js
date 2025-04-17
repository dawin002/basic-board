import { getAxiosErrorMessage } from '/js/utils/getAxiosErrorMessage.js';
import { handleAxiosErrorSideEffect } from '/js/utils/handleAxiosErrorSideEffect.js';
import { moveToList, moveToDetail } from '/js/utils/navigation.js';

let boardNumber;

window.onload = async function () {
  try {
    const paths = window.location.pathname.split('/');
    boardNumber = paths[paths.length - 1];

    if (!boardNumber) {
      console.error('게시글 번호가 제공되지 않았습니다.');
      return;
    }

    const response = await axios.get(`/api/boards/${boardNumber}`);
    const board = response.data;

    document.getElementById('author').textContent = board.author;
    document.getElementById('title').value = board.title;
    document.getElementById('content').value = board.content;

    console.log('게시글 불러옴', board);
  } catch (error) {
    const { status, message } = getAxiosErrorMessage(error);

    handleAxiosErrorSideEffect(status, message, (status, message) => {
      if (status === 404) moveToList();
    });
  }

  document.getElementById('move-to-detail-button').addEventListener('click', () => moveToDetail(boardNumber));
  document.getElementById('update-board-button').addEventListener('click', updateBoard);
};

const updateBoard = async function () {
  try {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    console.log(title, content);

    if (!title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }

    if (!content.trim()) {
      alert('본문을 입력해주세요.');
      return;
    }

    const response = await axios.patch(`/api/boards/${boardNumber}`, {
      title,
      content,
    });

    const { message, board } = response.data;
    console.log(message, board);

    moveToDetail(boardNumber);
  } catch (error) {
    const { status, message } = getAxiosErrorMessage(error);

    handleAxiosErrorSideEffect(status, message, (status, message) => {
      if (status === 404) moveToList();
      if (status === 409) moveToDetail(boardNumber);
    });
  }
};
