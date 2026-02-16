// features/question/hooks/comment/useToggleAnswerLike.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UseMutationCallback } from '@/types/useMutationCallback';
import { toggleAnswerLike } from '../../services/answer/toggleAnswerLike';
import { QUERY_KEYS } from '@/lib/constants';
import { AnswerEntity } from '../../services/answer/fetchAnswer';

export const useToggleAnswerLike = (callbacks?: UseMutationCallback) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleAnswerLike,

    // 낙관적 업데이트
    onMutate: async ({
      answerId,
      questionId,
    }: {
      answerId: string;
      questionId: string;
    }) => {
      // 1. 해당 질문의 전체 답변 리스트 캐시 취소
      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.answer.byQuestionId(questionId),
      });

      // 2. 이전 상태 저장 (롤백용)
      const previous = queryClient.getQueryData<AnswerEntity[]>(
        QUERY_KEYS.answer.byQuestionId(questionId),
      );

      // 3. 낙관적 업데이트 수행
      queryClient.setQueryData<AnswerEntity[]>(
        QUERY_KEYS.answer.byQuestionId(questionId),
        (answers) =>
          answers?.map((a) =>
            a.id === answerId
              ? {
                  ...a,
                  isLiked: !a.isLiked,
                  like_count: a.isLiked ? a.like_count - 1 : a.like_count + 1,
                }
              : a,
          ),
      );

      return { previous };
    },

    // 오류 발생 시 롤백
    onError: (error, variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(
          QUERY_KEYS.answer.byQuestionId(variables.questionId),
          context.previous,
        );
      }
      if (callbacks?.onError) callbacks.onError(error);
    },

    // 성공 후 콜백
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
  });
};
