// features/question/hooks/useIncrementViewCount.ts

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/constants';
import { incrementViewCount } from '../../services/question/incrementViewCount';
import { UseMutationCallback } from '@/types/useMutationCallback';

export const useIncrementViewCount = (callbacks?: UseMutationCallback) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (questionIdx: number) => incrementViewCount(questionIdx),

    onSuccess: (questionIdx) => {
      // 해당 질문의 상세 정보를 최신화
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.question.detail(questionIdx),
      });

      if (callbacks?.onSuccess) callbacks.onSuccess();
    },

    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
};
