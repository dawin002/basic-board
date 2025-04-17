export const moveToList = function () {
  window.location.href = '/board-list.html';
};

export const moveToCreate = function () {
  window.location.href = '/board-create.html';
};

export const moveToDetail = function (boardNumber) {
  window.location.href = `/board-detail/${boardNumber}`;
};

export const moveToUpdate = function (boardNumber) {
  window.location.href = `/board-update/${boardNumber}`;
};
