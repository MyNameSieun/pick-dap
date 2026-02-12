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
    byId: (id: string | number, userId: string) =>
      [...QUERY_KEYS.answer.all, 'byIdx', String(id), userId] as const,
  },
};
