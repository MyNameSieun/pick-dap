import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UseMutationCallback } from '@/types/useMutationCallback';
import { createQuestion } from '../../services/question/createQuestion';
import { QuestionEntity } from '@/types/entity';
import { QUERY_KEYS } from '@/lib/constants';

export const useCreateQuesion = (
  callbacks?: UseMutationCallback<QuestionEntity>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createQuestion,
    onSuccess: async (newQuestion: QuestionEntity) => {
      // 캐시 무효화가 완료될 때까지 기다림
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.question.list,
      });

      // 컴포넌트에서 넘겨준 후속 로직 실행 (toast, close 등)
      if (callbacks?.onSuccess) {
        callbacks.onSuccess(newQuestion);
      }
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
};
