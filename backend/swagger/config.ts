// api docs의 정보(api 제목, 버전, ...) 설정
export const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '다윈 게시판 API',
      version: '1.0.0',
      description: '게시판 CRUD 기능을 제공하는 API 문서입니다.',
    },
  },
  apis: ['./swagger/*.swagger.ts'], // swagger 파일 위치 설정(api docs로 인식할 위치)
  //                                   : swagger 폴더 안의 .swagger.js로 끝나는 모든 파일
  tags: [
    {
      name: 'Board',
      description: '게시글 관련 API (전체 조회, 상세 조회, 등록, 수정, 삭제)',
    },
  ],
};
