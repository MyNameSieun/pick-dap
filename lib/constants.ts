export const QUERY_KEYS = {
  question: {
    all: ['question'],
    list: ['question', 'list'],
    byId: (questionId: number) => ['question', 'byId', questionId],
  },
};
