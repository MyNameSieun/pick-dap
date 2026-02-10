import { QuestionEntity } from '@/types/entity';
import { UseMutationCallback } from '@/types/useMutationCallback';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteQuestion } from '../services/deleteQuestion';
import { QUERY_KEYS } from '@/lib/constants';

export const useDeleteQuestion = (
  callbacks?: UseMutationCallback<QuestionEntity>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteQuestion,

    onSuccess: (deletedIdx) => {
      // 리스트 캐시에서 제거
      queryClient.setQueryData<QuestionEntity[]>(
        QUERY_KEYS.question.list,
        (prev) => {
          if (!prev) return prev;
          return prev.filter((q) => q.idx != deletedIdx);
        },
      );

      // 2. 상세 페이지 캐시가 있다면 제거
      queryClient.removeQueries({
        queryKey: QUERY_KEYS.question.byId(String(deletedIdx)),
      });

      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
};
