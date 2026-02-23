import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UseMutationCallback } from '@/types/useMutationCallback';
import { QUERY_KEYS } from '@/lib/constants';
import { toggleBookmark } from '../../services/question/toggleBookmark';
import { QuestionWithDetails } from '../../services/question/fetchQuestion';

interface useToggleBookmarkProps {
  questionId: string;
  questionIdx: number;
}

export const useToggleBookmark = (callbacks?: UseMutationCallback) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ questionId }: useToggleBookmarkProps) =>
      toggleBookmark({ questionId }),

    onMutate: async ({ questionIdx }: useToggleBookmarkProps) => {
      // 1. 모든 관련 쿼리 취소 (충돌 방지)
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.question.all });

      // 2. 롤백을 위해 현재의 모든 질문 쿼리 스냅샷 저장
      const previousQueries = queryClient.getQueriesData({
        queryKey: QUERY_KEYS.question.all,
      });

      // 4. [상세 페이지 업데이트]
      // 정확한 idx 키를 타겟팅하여 단일 객체 업데이트
      queryClient.setQueryData<QuestionWithDetails>(
        QUERY_KEYS.question.detail(questionIdx),
        (old) => {
          if (!old) return old;
          const isBookmarked = old.is_mine_bookmarked;
          return {
            ...old,
            is_mine_bookmarked: !isBookmarked,
            total_bookmark_count: isBookmarked
              ? Math.max(0, old.total_bookmark_count - 1)
              : old.total_bookmark_count + 1,
          };
        },
      );

      return { previousQueries };
    },

    onError: (error, variables, context) => {
      // 오류 발생 시 저장했던 모든 쿼리 스냅샷 복구
      if (context?.previousQueries) {
        context.previousQueries.forEach(([queryKey, oldData]) => {
          queryClient.setQueryData(queryKey, oldData);
        });
      }
      if (callbacks?.onError) callbacks.onError(error);
    },

    onSettled: () => {
      // 성공/실패 여부와 상관없이 서버와 동기화
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.question.all });
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
  });
};
