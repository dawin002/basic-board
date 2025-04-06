/**
 * @swagger
 * /boards/{number}:
 *   patch:
 *     summary: 게시글 수정하기
 *     tags: [Board]
 *     parameters:
 *       - in: path
 *         name: number
 *         required: true
 *         schema:
 *           type: integer
 *         description: 수정할 게시글 번호
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: 수정된 제목입니다
 *               content:
 *                 type: string
 *                 example: 수정된 내용입니다
 *     responses:
 *       200:
 *         description: 게시글 수정 성공
 *       400:
 *         description: 입력값 오류 또는 수정된 내용 없음
 *       404:
 *         description: 게시글을 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */
