import { getAxiosErrorMessage } from './utils/getAxiosErrorMessage.js';
import { handleAxiosErrorSideEffect } from './utils/handleAxiosErrorSideEffect.js';
import { moveToCreate } from './utils/navigation.js';

window.onload = async function () {
  try {
    // 백엔드에서 게시글 목록을 받아옴
    const response = await axios.get('http://localhost:3000/api/boards');
    const boards = response.data; // 받은 데이터를 boards 변수에 저장

    boards.sort((a, b) => b.number - a.number);
    console.log('게시글 불러옴', boards);

    // 게시글 데이터를 테이블에 추가하는 함수 호출
    addBoardsToTable(boards);
  } catch (error) {
    const { status, message } = getAxiosErrorMessage(error);

    handleAxiosErrorSideEffect(status, message);
  }

  document.getElementById('move-to-create-button').addEventListener('click', moveToCreate);
};

// boards 데이터를 받아와서 테이블에 추가하는 함수
function addBoardsToTable(boards) {
  const tbody = document.querySelector('table tbody');

  // 기존 테이블의 내용은 비우고, 새로 받아온 게시글로 채우기
  tbody.innerHTML = '';

  // boards 배열을 순회하면서 각 게시글에 대해 <tr>을 생성
  boards.forEach((board) => {
    const row = document.createElement('tr');

    // 각 게시글의 정보를 <td>로 추가
    row.innerHTML = `
        <td>${board.number}</td>
        <td style="text-align: left">
            <a href="/board-detail/${board.number}" style="text-decoration: none; color: black;">
                ${board.title}
            <a/>
        </td>
        <td>${board.author}</td>
        <td>${new Date(board.createdAt).toLocaleDateString()}</td>
      `;

    // 테이블에 새로운 행 추가
    tbody.appendChild(row);
  });
}
