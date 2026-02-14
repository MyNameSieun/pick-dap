import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UseMutationCallback } from '@/types/useMutationCallback';
import { QUERY_KEYS } from '@/lib/constants';
import { updateQuestion } from '../../services/question/updateQuestion';
import { QuestionWithDetails } from '../../services/question/fetchQuestion';

export const useUpdateQuestion = (
  callbacks?: UseMutationCallback<QuestionWithDetails>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateQuestion,
    onSuccess: async (updatedData) => {
      /* 방법1. 캐시 즉시 업데이트 */
      queryClient.setQueryData(
        QUERY_KEYS.question.byIdx(String(updatedData.idx)),
        updatedData,
      );
      /* 방법2. 쿼리 무효화 */
      // await queryClient.invalidateQueries({
      //   queryKey: QUERY_KEYS.question.byIdx(data.idx),
      // });

      if (callbacks?.onSuccess) {
        callbacks.onSuccess();
      }
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
};
