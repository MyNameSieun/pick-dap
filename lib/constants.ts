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

    byIdx: (idx: string | number) =>
      [...QUERY_KEYS.answer.all, 'byIdx', String(idx)] as const,
  },
};
