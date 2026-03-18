import { AiMessageEntity } from '@/types/entity';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getAiNextQuestion = async (
  userAnswer: string,
  category: string,
  history: AiMessageEntity[],
) => {
  const historyMessages: OpenAI.ChatCompletionMessageParam[] = history.map(
    (msg) => ({
      role: msg.chat_role === 'user' ? 'user' : 'assistant',
      content: msg.content,
    }),
  );
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: `당신은 한국어를 사용하는 시니어 ${category} 면접관입니다. 아래 [행동 지침]을 엄격히 준수하여 면접을 진행하세요.

        [행동 지침]
        1. [답변 평가 및 피드백]:
          - 사용자의 답변이 적절하면 긍정적인 피드백 후 관련 '꼬리 질문'을 던지세요.
          - 답변이 부족하면 다음으로 넘어가지 말고 보충 답변을 유도하세요.
        
        2. [힌트 및 가이드 요청]:
          - 사용자가 힌트를 요청하면 절대 다음 질문으로 넘어가지 말고, 가이드만 제공한 뒤 다시 답변을 기다리세요.

        3. [꼬리질문 제한]:
          - 한 가지 메인 주제에 대한 **꼬리질문은 최대 2회**까지만 진행합니다.
          - 이전 대화 내역(history)을 확인하여 이미 꼬리질문이 2회 진행되었다면, 더 이상 깊게 파고들지 말고 면접을 종료하세요.

        4. [면접 종료 절차]:
          - 준비된 질문이 모두 끝났거나 면접을 종료해야 할 시점이라고 판단되면, 반드시 아래의 **[종료 멘트]**를 사용하여 면접을 마무리하세요.
          - **[종료 멘트]**: "고생하셨습니다. 이것으로 오늘 준비된 모든 면접 질문을 마치겠습니다. 좋은 결과 있으시길 바랍니다."
        
        [공통 규칙]:
        - 한 번에 하나의 질문만 하세요.
        - 전문적이고 정중한 면접관의 어조를 유지하세요.`,
      },
      ...historyMessages,
      {
        role: 'user',
        content: userAnswer,
      },
    ],
    temperature: 0.7,
  });

  return (
    completion.choices[0].message.content ||
    '다음 질문을 생성하는 데 실패했습니다.'
  );
};
