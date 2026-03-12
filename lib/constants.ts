import { QuestionFilterOptions } from '@/features/question/services/question/fetchQuestion';
import { ReviewFilterOptions } from '@/features/review/services/fetchReviewData';

export const QUERY_KEYS = {
  question: {
    all: ['question'] as const,

    // 필터 객체를 인자로 받아 쿼리 키에 포함시킨다.
    list: (filters?: QuestionFilterOptions) =>
      [...QUERY_KEYS.question.all, 'list', filters] as const,

    // 상세 조회
    detail: (idx: number) =>
      [...QUERY_KEYS.question.all, 'detail', idx] as const,

    // 나의 질문 (마이페이지용, 보안 위해 props로 userId를 받지 않음)
    myList: (filters?: QuestionFilterOptions) =>
      [...QUERY_KEYS.question.all, 'list', 'me', filters] as const,

    // 내가 저장한 질문 (마이페이지용, 보안 위해 props로 userId를 받지 않음)
    mySaveList: (filters?: QuestionFilterOptions) =>
      [...QUERY_KEYS.question.all, 'list', 'me', 'save', filters] as const,

    // 특정 유저가 작성한 질문 목록 조회 (타인 프로필용)
    userList: (userId: string) =>
      [...QUERY_KEYS.question.list(), 'user', userId] as const,
  },

  /**
   * 서버 로직 내부에서 supabase.auth.getUser()를 통해 로그인한 사용자를 식별하고 있는 경우
   * userId를 props로 받을 필요 없음
   * 쿼리키에서 props로 가져온 userId는 클라이언트(브라우저) 환경에 있는 데이터인데,
   * 클라이언트에서 userId를 넘겨주면, 악의적인 사용자가 다른 사람의 UUID를 인자로 가로채서 보낼 위험 존재하기 때문
   */

  answer: {
    all: ['answer'] as const,

    // 전체 목록
    list: ['answer', 'list'] as const,

    // 특정 질문 답변
    byQuestionId: (questionId: string) =>
      [...QUERY_KEYS.answer.list, 'feed', questionId] as const,

    // 특정 질문에 대한 나의 단건 답변
    // 단건 데이터의 특성을 고려하여 list가 아닌 all 직속의 독립 경로로 관리
    byQuestionIdMine: (questionId: string) =>
      [...QUERY_KEYS.answer.all, 'mine', questionId] as const,

    // 나의 전체 답변 목록 (마이페이지용)
    // 보안을 위해 userId를 props로 받지 않음
    myList: () => [...QUERY_KEYS.answer.list, 'me'] as const,

    // 특정 유저가 작성한 답변
    byUserId: (userId: string) =>
      [...QUERY_KEYS.answer.list, 'user', userId] as const,
  },

  comment: {
    all: ['comment'] as const,

    // 전체 목록
    list: ['comment', 'list'] as const,

    // 특정 댓글 상세
    detail: (commentId: string) =>
      [...QUERY_KEYS.comment.all, 'detail', commentId] as const,

    // 특정 게시물에 달린 댓글 리스트 (post 페이지)
    byPostId: (postId: string) =>
      [...QUERY_KEYS.comment.list, 'post', postId] as const,

    // 특정 게시물에 달린 댓글 내 댓글 리스트 (post 페이지)
    myPostComments: (postId: string) =>
      [...QUERY_KEYS.comment.list, 'post', postId, 'me'] as const,

    // 특정 게시물 내의 특정 유저 댓글 (post 페이지)
    userPostComments: (postId: string, userId: string) =>
      [...QUERY_KEYS.comment.list, 'post', postId, 'user', userId] as const,

    // 특정 답변에 달린 댓글 리스트 (qustion 페이지)
    byAnswerId: (answerId: string) =>
      [...QUERY_KEYS.comment.list, 'answer', answerId] as const,

    // 특정 답변에 달린 내 댓글 리스트 (qustion 페이지)
    myAnswerComments: (answerId: string) =>
      [...QUERY_KEYS.comment.list, 'answer', answerId, 'me'] as const,

    // 특정 답변 내의 특정 유저 댓글 (qustion 페이지)
    userAnswerComments: (answerId: string, userId: string) =>
      [...QUERY_KEYS.comment.list, 'answer', answerId, 'user', userId] as const,
  },

  review: {
    all: ['review'] as const,

    list: (filters?: ReviewFilterOptions) =>
      [...QUERY_KEYS.review.all, 'list', filters] as const,

    detail: (reviewId: string) =>
      [...QUERY_KEYS.review.all, 'review', reviewId] as const,

    myReview: (reviewId: string) =>
      [...QUERY_KEYS.comment.list, 'review', reviewId, 'me'] as const,
  },

  process: {
    all: ['process'] as const,

    list: () => [...QUERY_KEYS.process.all, 'list'] as const,
    detail: (reviewId: string) =>
      [...QUERY_KEYS.process.all, 'detail', reviewId] as const,
  },

  reviewQuestionType: {
    all: ['review-question-type'] as const,
    list: () => [...QUERY_KEYS.reviewQuestionType.all, 'list'] as const,
  },

  jobRole: {
    all: ['job-role'] as const,
    list: () => [...QUERY_KEYS.jobRole.all, 'list'] as const,
  },

  interview_question: {
    all: ['interview-question'] as const,
    list: () => [...QUERY_KEYS.interview_question.all, 'list'] as const,
  },

  project: {
    all: ['project'] as const,

    list: ['project', 'list'] as const,
    myList: ['project', 'list', 'me'] as const,
    userList: (userId: string) =>
      [...QUERY_KEYS.project.list, 'user', userId] as const,

    myDetail: (slug: string) =>
      [...QUERY_KEYS.project.all, 'detail', 'me', slug] as const,
    userDetail: (slug: string) =>
      [...QUERY_KEYS.project.all, 'detail', 'user', slug] as const,
  },

  post: {
    all: ['post'] as const,
    list: ['post', 'list'] as const,
    categoryList: (categorySlug: string) =>
      [...QUERY_KEYS.post.list, categorySlug] as const,

    myList: ['post', 'list', 'me'] as const,
    userList: (userId: string) =>
      [...QUERY_KEYS.post.list, 'user', userId] as const,

    detail: (slug: string) => [...QUERY_KEYS.post.all, 'detail', slug] as const,

    myDetail: (slug: string) =>
      [...QUERY_KEYS.post.all, 'detail', 'me', slug] as const,

    userDetail: (slug: string) =>
      [...QUERY_KEYS.post.all, 'detail', 'user', slug] as const,
  },
};
