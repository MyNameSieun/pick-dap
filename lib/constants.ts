import { QuestionFilterOptions } from '@/features/question/services/question/fetchQuestion';

export const QUERY_KEYS = {
  question: {
    all: ['question'],
    list: (filters: QuestionFilterOptions) =>
      [...QUERY_KEYS.question.all, filters] as const,
    byIdx: (idx: string | number) =>
      [...QUERY_KEYS.question.all, 'detail', String(idx)] as const,
  },

  answer: {
    all: ['answer'],
    // 특정 질문에 대한 모든 답변
    byQuestionId: (questionId: string | number) =>
      [...QUERY_KEYS.answer.all, 'others', String(questionId)] as const,

    // 나의 답변
    byUserAndQuestion: (questionId: string | number, userId: string) =>
      [...QUERY_KEYS.answer.all, 'mine', String(questionId), userId] as const,
  },

  comment: {
    all: ['comment'],
    // 특정 게시물에 달린 댓글 리스트 (post 페이지)
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
