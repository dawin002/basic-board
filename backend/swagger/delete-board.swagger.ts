/**
 * @swagger
 * /api/boards/{number}:
 *   delete:
 *     summary: 게시글 삭제하기 (소프트 딜리트)
 *     tags: [Board]
 *     parameters:
 *       - in: path
 *         name: number
 *         required: true
 *         schema:
 *           type: integer
 *         description: 삭제할 게시글 번호
 *     responses:
 *       204:
 *         description: 게시글 삭제 성공 (내용 없음)
 *       404:
 *         description: 게시글을 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */
