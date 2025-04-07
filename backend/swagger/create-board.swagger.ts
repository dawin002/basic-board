/**
 * @swagger
 * /api/boards:
 *   post:
 *     summary: 게시글 등록하기
 *     tags: [Board]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - author
 *               - title
 *               - content
 *             properties:
 *               author:
 *                 type: string
 *                 example: 철수
 *               title:
 *                 type: string
 *                 example: 첫 번째 글입니다
 *               content:
 *                 type: string
 *                 example: 안녕하세요! 게시글 작성해봅니다.
 *     responses:
 *       201:
 *         description: 게시글 등록 성공
 *       400:
 *         description: 입력값 오류
 *       500:
 *         description: 서버 오류
 */
