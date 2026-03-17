import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { questionId, userAnswer, history } = body;

    // 1. 필수 데이터 검증
    if (!userAnswer) {
      return NextResponse.json(
        { error: '답변 내용이 없습니다.' },
        { status: 400 },
      );
    }

    /* 2. AI 모델 호출 로직 (예: OpenAI/Gemini SDK 사용)
       여기에 프롬프트를 잘 작성하는 것이 핵심입니다.
    */

    // 임시로 AI가 응답을 생성하는 시뮬레이션 로직
    const aiFeedback =
      '좋은 답변입니다! 말씀하신 내용 중에서 프로젝트 협업 시 발생한 갈등을 어떻게 해결하셨는지 조금 더 구체적으로 말씀해주실 수 있나요?';

    // 3. 성공 응답 반환
    return NextResponse.json({
      success: true,
      message: aiFeedback,
      // 필요한 경우 분석 데이터(점수 등)를 추가로 보낼 수 있습니다.
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다. 다시 시도해주세요.' },
      { status: 500 },
    );
  }
}
