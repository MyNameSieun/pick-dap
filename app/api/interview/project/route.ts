import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface ProjectDetailItem {
  description: string;
  sort_order?: number;
}

interface RequestBody {
  title: string;
  description: string;
  project_type: string;
  service_purpose: string;
  start_date?: string;
  end_date?: string;
  functions: ProjectDetailItem[];
  roles: ProjectDetailItem[];
  tech_stacks: ProjectDetailItem[];
  troubleshootings: ProjectDetailItem[];
  performances: ProjectDetailItem[];
  retrospectives: ProjectDetailItem[];
}

export async function POST(request: NextRequest) {
  try {
    const body: RequestBody = await request.json();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: '서버의 OpenAI API 키 설정이 누락되었습니다.' },
        { status: 500 },
      );
    }

    const formatList = (items: ProjectDetailItem[]) =>
      items?.length > 0
        ? items.map((item) => `- ${item.description}`).join('\n')
        : '등록된 정보 없음';

    const prompt = `
        당신은 IT 기업의 시니어 기술 면접관입니다. 지원자가 제출한 [프로젝트 명세서]를 분석하여, 실무 역량과 문제 해결 능력을 검증할 수 있는 날카로운 면접 질문 3개를 생성하세요.

        [프로젝트 명세서]
        - 프로젝트명: ${body.title} (${body.project_type})
        - 기간: ${body.start_date || '미정'} ~ ${body.end_date || '미정'}
        - 개요: ${body.description}
        - 서비스 목적: ${body.service_purpose}

        [상세 구현 및 경험]
        1. 주요 기능:
        ${formatList(body.functions)}

        2. 담당 역할:
        ${formatList(body.roles)}

        3. 사용 기술 스택:
        ${formatList(body.tech_stacks)}

        4. 트러블슈팅(문제 해결) 경험:
        ${formatList(body.troubleshootings)}

        5. 성능 개선 및 성과:
        ${formatList(body.performances)}

        6. 회고 및 학습 내용:
        ${formatList(body.retrospectives)}

        [질문 생성 조건]
        1. 위 데이터 중 특히 '트러블슈팅'과 '성능 개선' 섹션을 기반으로 한 경험 중심의 심화 질문을 최소 1개 포함하세요.
        2. 답변을 통해 지원자의 '기술적 의사결정 이유'를 파악할 수 있어야 합니다.
        3. 질문마다 관련 기술 키워드를 'tags' 배열에 2~3개 담으세요.
        4. 모든 응답은 반드시 한국어로 작성하세요.

        [출력 형식]
        반드시 다음 JSON 구조로만 응답하세요:
        {
        "items": [
            {
            "id": "1",
            "question": "질문 내용",
            "tags": ["React", "성능최적화"]
            }
        ]
        }
    `.trim();

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            '당신은 프로젝트 기반 면접 질문 생성기입니다. 반드시 {"items": []} 구조의 JSON만 출력합니다.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' },
    });

    const responseContent =
      completion.choices[0].message.content || '{"items": []}';
    const parsed = JSON.parse(responseContent);

    return NextResponse.json({ items: parsed.items || [] });
  } catch (error) {
    console.error('AI Route Error:', error);
    return NextResponse.json(
      {
        error: '질문 생성 중 서버 에러가 발생했습니다.',
      },
      { status: 500 },
    );
  }
}
