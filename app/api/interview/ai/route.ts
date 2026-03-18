import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      question_type,
      skills,
      topic,
    }: {
      question_type?: string;
      skills?: string;
      topic?: string;
    } = body;

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OPENAI_API_KEY is not configured on the server.' },
        { status: 500 },
      );
    }

    const prompt = `
    당신은 한국어를 사용하는 시니어 면접관입니다.
    아래 정보를 참고해서 프론트엔드/백엔드/기타 개발 직무용 기술 면접 질문을 생성하세요.
    
    - 직무 카테고리: ${question_type || '개발자'}
    - 보유 기술 스택(키워드): ${skills || '일반'}
    - 추가 주제: ${topic || '없음'}
    
    [요청]
    1) 기술 면접 질문을 3개 생성합니다.
    2) 각 질문과 함께 이 질문의 핵심 의도나 관련 기술을 나타내는 짧은 '태그'를 2~3개 생성하세요. (예: 난이도, 관련 기술명, CS 개념 등)
    3) 가능한 한 실무 중심, 구체적인 상황 기반 질문을 만들어 주세요.
    4) 출력은 JSON 배열만, 다른 문장은 절대 쓰지 마세요.
    
    출력 형식 예시:
    [
      {
        "id": "1",
        "question": "React에서 상태 관리를 할 때 Context API와 Redux의 차이점은 무엇인가요?",
        "tags": ["React", "상태관리"]
      },
    ]
        `.trim();

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            '당신은 기술 면접 질문 생성기입니다. 반드시 {"items": []} 형태의 JSON 객체만 출력하며, id는 문자열이어야 합니다.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' },
    });

    const text = completion.choices[0].message.content || '';

    try {
      const parsedData = JSON.parse(text);

      const items = Array.isArray(parsedData.items) ? parsedData.items : [];

      return NextResponse.json({ items });
    } catch (e) {
      return NextResponse.json(
        { error: 'JSON 파싱 실패', raw: text },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: '서버 에러' }, { status: 500 });
  }
}
