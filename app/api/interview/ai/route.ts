import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  // 질문 생성 API
  try {
    const body = await request.json();

    const {
      category,
      skills,
      topic,
    }: {
      category?: string;
      skills?: string;
      topic?: string;
    } = body;

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OPENAI_API_KEY is not configured on the server.' },
        { status: 500 },
      );
    }

    // 질문 생성 프롬프트
    const prompt = `
    당신은 한국어를 사용하는 시니어 면접관입니다.
    아래 정보를 참고해서 프론트엔드/백엔드/기타 개발 직무용 기술 면접 질문을 생성하세요.
    
    - 직무 카테고리: ${category || '미지정'}
    - 보유 기술 스택(키워드): ${skills || '미지정'}
    - 추가 주제: ${topic || '없음'}
    
    [요청]
    1) 기술 면접 질문을 3개 생성합니다.
    2) 각 질문과 함께 이 질문의 핵심 의도나 관련 기술을 나타내는 짧은 '태그'를 2~3개 생성하세요. (예: 난이도, 관련 기술명, CS 개념 등)
    3) 가능한 한 실무 중심, 구체적인 상황 기반 질문을 만들어 주세요.
    4) 출력은 JSON 배열만, 다른 문장은 절대 쓰지 마세요.
    
    출력 형식 예시:
    [
      {
        "id": 1,
        "question": "React에서 상태 관리를 할 때 Context API와 Redux의 차이점은 무엇인가요?",
        "tags": ["React", "상태관리"]
      }
    ]
        `.trim();

    // 모델(gpt-4o-mini) 사용
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        // 역할을 system으로 분리
        {
          role: 'system',
          content:
            '당신은 한국어를 사용하는 시니어 기술 면접관입니다. 오직 JSON 형식의 배열만 출력해야 합니다.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
    });

    // AI 응답 파싱
    const text = completion.choices[0].message.content || '';
    let items: Array<{ id: number; question: string; tags: string[] }> = [];
    const cleanText = text
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();

    try {
      items = JSON.parse(cleanText) as Array<{
        id: number;
        question: string;
        tags: string[];
      }>;
    } catch {
      return NextResponse.json(
        { error: 'AI 응답 파싱에 실패했습니다.', raw: text },
        { status: 500 },
      );
    }

    return NextResponse.json({ items });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: '질문 생성 중 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
