export const QUERY_KEYS = {
  question: {
    all: ['question'],
    list: ['question', 'list'],
    byId: (idx: string) => [...QUERY_KEYS.question.all, 'detail', idx] as const,
  },
};
