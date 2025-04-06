// /**
//  * @swagger
//  * /boards:
//  *   get:
//  *     summary: 전체 게시글 목록을 가져옵니다.
//  *     tags: [Board]
//  *     responses:
//  *       200:
//  *         description: 게시글 목록 반환
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 type: object
//  *                 properties:
//  *                   number:
//  *                     type: integer
//  *                     example: 1
//  *                   author:
//  *                     type: string
//  *                     example: 철수
//  *                   title:
//  *                     type: string
//  *                     example: 좋은아침 입니다~
//  *                   content:
//  *                     type: string
//  *                     example: 오늘 하루도 파이팅 하세요!
//  */

// /**
//  * @swagger
//  * /boards:
//  *   post:
//  *     summary: 새 게시글을 등록합니다.
//  *     tags: [Board]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - author
//  *               - title
//  *               - content
//  *             properties:
//  *               author:
//  *                 type: string
//  *                 example: 철수
//  *               title:
//  *                 type: string
//  *                 example: 인사드립니다.
//  *               content:
//  *                 type: string
//  *                 example: 오늘도 화이팅입니다!
//  *     responses:
//  *       201:
//  *         description: 게시글 생성 성공
//  */
