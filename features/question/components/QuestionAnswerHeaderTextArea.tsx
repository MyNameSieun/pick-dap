'use client';

import { useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea/Textarea';
import { useFetchAnswerQuestionById } from '../hooks/useFetchAnswerQuestion';

interface Props {
  questionId: string;
  userId: string;
  answer: string;
  setAnswer: (val: string) => void;
  isEditing: boolean;
}

const QuestionAnswerHeaderTextArea = ({
  questionId,
  userId,
  answer,
  setAnswer,
  isEditing,
}: Props) => {
  const { data: answerData } = useFetchAnswerQuestionById(questionId, userId);

  useEffect(() => {
    if (answerData?.answer) {
      setAnswer(answerData.answer);
    }
  }, [answerData, setAnswer]);

  return (
    <div>
      {answerData ? (
        <div>
          {isEditing ? (
            <Textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="이 질문에 대한 답변을 작성해보세요"
              className="bg-bg-default b1 h-45 p-4"
              autoFocus
            />
          ) : (
            <div className="b1 h-45 rounded-sm border border-gray-300 bg-gray-100 p-4 text-black">
              {answerData.answer}
            </div>
          )}
        </div>
      ) : (
        <div>
          <h3 className="mb-6">나의 답변 작성</h3>
          <Textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="이 질문에 대한 답변을 작성해보세요"
            className="bg-bg-default b1 h-45 p-4"
            autoFocus
          />
        </div>
      )}
    </div>
  );
};

export default QuestionAnswerHeaderTextArea;
