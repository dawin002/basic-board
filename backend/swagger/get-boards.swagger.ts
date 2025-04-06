/**
 * @swagger
 * /boards:
 *   get:
 *     summary: 모든 게시글 가져오기
 *     tags: [Board]
 *     responses:
 *       200:
 *         description: 성공적으로 게시글을 가져옴
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   number:
 *                     type: integer
 *                     example: 1
 *                   author:
 *                     type: string
 *                     example: 철수
 *                   title:
 *                     type: string
 *                     example: 좋은 아침입니다~
 *                   content:
 *                     type: string
 *                     example: 오늘 하루도 파이팅 하세요!
 */
