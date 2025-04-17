import { getAxiosErrorMessage } from '/js/utils/getAxiosErrorMessage.js';
import { handleAxiosErrorSideEffect } from '/js/utils/handleAxiosErrorSideEffect.js';
import { moveToList, moveToCreate, moveToUpdate } from '/js/utils/navigation.js';

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

    if (response.status === 200) {
      const board = response.data;

      document.getElementById('author').textContent = board.author;
      document.getElementById('title').textContent = board.title;
      document.getElementById('content').textContent = board.content;
      document.getElementById('createdAt').textContent = new Date(board.createdAt).toLocaleString();

      console.log('게시글 불러옴\n', board);
    }
  } catch (error) {
    const { status, message } = getAxiosErrorMessage(error);

    handleAxiosErrorSideEffect(status, message, (status, message) => {
      if (status === 404) moveToList();
    });
  }

  document.getElementById('move-to-list-button').addEventListener('click', moveToList);
  document.getElementById('move-to-update-button').addEventListener('click', () => moveToUpdate(boardNumber));
  document.getElementById('move-to-create-button').addEventListener('click', moveToCreate);
  document.getElementById('delete-board-button').addEventListener('click', deleteBoard);
};

const deleteBoard = async function () {
  try {
    if (!boardNumber) {
      console.error('게시글 번호가 제공되지 않았습니다.');
      return;
    }
    console.log(boardNumber);

    const response = await axios.delete(`/api/boards/${boardNumber}`);

    if (response.status === 204) {
      alert('게시글을 성공적으로 삭제했습니다.');
      moveToList();
    }
  } catch (error) {
    const { status, message } = getAxiosErrorMessage(error);

    handleAxiosErrorSideEffect(status, message, (status, message) => {
      if (status === 404) moveToList();
    });
  }
};
