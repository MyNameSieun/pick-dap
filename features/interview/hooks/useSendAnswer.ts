import { QUERY_KEYS } from '@/lib/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sendAnswerAction } from '../actions/sendAnswerAction';
import { AiInterviewEntity } from '@/types/entity';

export const useSendAnswer = (interviewId: string) => {
  const queryClient = useQueryClient();

  const messageListKey = QUERY_KEYS.aiMessage.list(interviewId);

  return useMutation({
    mutationFn: sendAnswerAction,

    onMutate: async (newAnswer) => {
      await queryClient.cancelQueries({ queryKey: messageListKey });

      const previousMessages = queryClient.getQueryData(messageListKey);

      queryClient.setQueryData(messageListKey, (old: AiInterviewEntity[]) => [
        ...(old || []),
        {
          id: Date.now().toString(),
          interview_id: interviewId,
          chat_role: 'user',
          content: newAnswer.content,
          created_at: new Date().toISOString(),
        },
      ]);

      return { previousMessages };
    },

    onError: (err, newAnswer, context) => {
      if (context?.previousMessages) {
        queryClient.setQueryData(messageListKey, context.previousMessages);
      }
      alert('전송에 실패했습니다. 다시 시도해주세요.');
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: messageListKey });
    },
  });
};
