/**
 * @swagger
 * /boards/{number}:
 *   get:
 *     summary: 특정 게시글 가져오기
 *     tags: [Board]
 *     parameters:
 *       - in: path
 *         name: number
 *         required: true
 *         schema:
 *           type: integer
 *         description: 게시글 번호
 *     responses:
 *       200:
 *         description: 게시글 정보
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 number:
 *                   type: integer
 *                   example: 1
 *                 author:
 *                   type: string
 *                   example: 철수
 *                 title:
 *                   type: string
 *                   example: 좋은 아침입니다~
 *                 content:
 *                   type: string
 *                   example: 오늘 하루도 파이팅 하세요!
 *       404:
 *         description: 게시글을 찾을 수 없음
 */
