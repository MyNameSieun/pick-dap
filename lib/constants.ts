export const QUERY_KEYS = {
  question: {
    all: ['question'],
    list: ['question', 'list'],
    byId: (questionId: string) => ['question', 'detail', questionId] as const,
  },
};
