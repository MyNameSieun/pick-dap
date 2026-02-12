'use client';

import { useEffect, useRef } from 'react';
import { Textarea } from '@/components/ui/textarea/Textarea';
import { AnswerQuestionJoinType } from '../services/fetchAnswerQuestion';

interface Props {
  answerData: AnswerQuestionJoinType | null;
  questionId: string;
  answer: string;
  setAnswer: (val: string) => void;
  isEditing: boolean;
}

const QuestionAnswerHeaderTextArea = ({
  answerData,
  answer,
  setAnswer,
  isEditing,
}: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 커서 위치를 텍스트의 맨 끝으로
  useEffect(() => {
    if (isEditing && textareaRef.current) {
      const el = textareaRef.current;

      el.focus();

      const length = el.value.length;
      el.setSelectionRange(length, length);
    }
  }, [isEditing]);

  return (
    <div>
      {answerData ? (
        <div>
          {isEditing ? (
            <Textarea
              ref={textareaRef}
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
