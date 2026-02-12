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
};
