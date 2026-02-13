export const QUERY_KEYS = {
  question: {
    all: ['question'],
    list: ['question', 'list'],
    byIdx: (idx: string | number) =>
      [...QUERY_KEYS.question.all, 'detail', String(idx)] as const,
  },

  answer: {
    all: ['answer'],
    list: ['answer', 'list'],
    // 단일 조회 (나의 답변)
    byUserAndQuestion: (questionId: string | number, userId: string) =>
      [...QUERY_KEYS.answer.all, 'mine', String(questionId), userId] as const,

    // 리스트 조회 (다른 사람 답변들)
    byQuestionId: (questionId: string | number) =>
      [...QUERY_KEYS.answer.all, 'others', String(questionId)] as const,
  },

  comment: {
    all: ['comment'],
    // 특정 게시물(post 페이지)에 달린 댓글 리스트
    byPostId: (postId: string | number) =>
      [...QUERY_KEYS.comment.all, 'post', String(postId)] as const,

    // 특정 답변에 달린 댓글 리스트 (qustion 페이지)
    byAnswerId: (answerId: string | number) =>
      [...QUERY_KEYS.comment.all, 'answer', String(answerId)] as const,

    // 특정 사용자가 작성한 댓글 모아보기 (마이페이지용)
    byUserId: (userId: string) =>
      [...QUERY_KEYS.comment.all, 'user', userId] as const,
  },
};
