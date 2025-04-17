import { getAxiosErrorMessage } from '/js/utils/getAxiosErrorMessage.js';
import { handleAxiosErrorSideEffect } from '/js/utils/handleAxiosErrorSideEffect.js';
import { moveToDetail, moveToList } from '/js/utils/navigation.js';

window.onload = function () {
  document.getElementById('move-to-list-button').addEventListener('click', moveToList);
  document.getElementById('create-board-button').addEventListener('click', createBoard);
};

const createBoard = async function () {
  try {
    const author = document.getElementById('author').value;
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    if (!author.trim()) {
      alert('작성자를 입력해주세요.');
      return;
    }

    if (!title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }

    if (!content.trim()) {
      alert('본문을 입력해주세요.');
      return;
    }

    const response = await axios.post('/api/boards', {
      author,
      title,
      content,
    });

    if (response.status === 201) {
      console.log(response.data.message, response.data.board);
    }

    console.log(response.data);

    const boardNumber = response.data.board.number;
    moveToDetail(boardNumber);
  } catch (error) {
    const { status, message } = getAxiosErrorMessage(error);

    handleAxiosErrorSideEffect(status, message);
  }
};
