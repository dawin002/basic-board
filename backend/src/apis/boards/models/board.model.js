export class BoardsModel {
  boards = [
    {
      number: 1,
      author: '다윈',
      title: '안녕하세요!',
      content: '최초의 게시글입니다.',
      createdAt: new Date('2025-03-01T09:30:00+09:00'),
      deletedAt: null,
    },
    {
      number: 2,
      author: '창훈',
      title: '다윈아 뭐하니!',
      content: '다윈아 뭐해! 술먹자!',
      createdAt: new Date('2025-03-02T19:00:00+09:00'),
      deletedAt: null,
    },
    {
      number: 3,
      author: '수지',
      title: '나도 껴줘',
      content: '술 먹을 거면 나도 껴주라!',
      createdAt: new Date('2025-03-02T20:30:00+09:00'),
      deletedAt: null,
    },
  ];
}
