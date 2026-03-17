// 프론트 -> 서버
export type GenerateQuestionsRequest = {
  category: string;
  skills?: string;
  topic?: string;
};

// 서버 -> 프론트
export type GenerateQuestionsResponse = {
  id: number;
  question: string;
  tags: string[];
};

export const fetchGenerateQuestions = async (
  options: GenerateQuestionsRequest,
): Promise<GenerateQuestionsResponse[]> => {
  const response = await fetch('/api/interview/ai', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(options),
  });

  if (!response.ok) {
    throw new Error(
      'AI가 질문을 생성하는 데 실패했습니다. 다시 시도해 주세요.',
    );
  }

  const data = await response.json();
  return data.items;
};
