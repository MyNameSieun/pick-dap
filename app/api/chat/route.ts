import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { messages, category, question, interviewId } = await req.json();

    const result = await streamText({
      model: openai('gpt-4o'),
      messages: [
        {
          role: 'system',
          content: `너는 IT 전문 면접관 '픽봇'이야. 직무: ${category}, 질문: ${question}...`,
        },
        ...messages,
      ],
      // 🚀 스트리밍이 성공적으로 끝났을 때 실행되는 마법의 콜백!
      onFinish: async ({ text }) => {
        try {
          const lastUserMessage = messages[messages.length - 1].content;

          console.log('--- 실시간 데이터 저장 시작 ---');
          console.log('유저 답변:', lastUserMessage);
          console.log('AI 질문:', text);

          console.log('--- DB 저장 완료 ---');
        } catch (dbError) {
          console.error('데이터베이스 저장 중 오류 발생:', dbError);
        }
      },
    });

    return result.toTextStreamResponse();
  } catch (error) {
    return new Response(JSON.stringify({ error: 'AI 연결 실패' }), {
      status: 500,
    });
  }
}
