export const QUERY_KEYS = {
  question: {
    all: ['question'],
    list: ['question', 'list'],
    byId: (id: string) => [...QUERY_KEYS.question.all, 'detail', id] as const,
  },
};
