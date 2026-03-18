import { Lightbulb } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { GenerateQuestionsResponse } from '../../services/fetchGenerateQuestions';
import { Button } from '@/components/ui/button/Button';
import AiThinkingBubble from './AiThinkingBubble';

interface AiNextSectionProps {
  questions: GenerateQuestionsResponse[];
  isPending: boolean;
  onStart: (question: GenerateQuestionsResponse) => void;
}

const AiNextSection = ({
  questions,
  isPending,
  onStart,
}: AiNextSectionProps) => {
  return (
    <div className={twMerge('container-col', 'w-3/5 gap-8 p-9')}>
      {/* 헤더 */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <h5 className="h5 text-gray-1000">
          생성된 면접 질문
          {questions.length > 0 && (
            <span className="text-main-500 ml-2">{questions.length}개</span>
          )}
        </h5>
      </div>

      <div className="flex flex-col gap-4">
        {/* 로딩 상태 */}
        {isPending && <AiThinkingBubble />}

        {/* 빈 상태 (초기 화면) */}
        {!isPending && questions.length === 0 && (
          <div className="my-20 flex flex-col items-center justify-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-gray-400">
              <Lightbulb size={40} />
            </div>
            <h5 className="h5 mt-2 text-gray-700">
              옵션을 선택하고 질문을 생성해보세요
            </h5>
            <p className="b2 text-gray-500">
              직무와 난이도에 맞는 맞춤형 질문이 제공됩니다.
            </p>
          </div>
        )}

        {/* 생성된 질문 결과 리스트 */}
        {!isPending && questions.length > 0 && (
          <div className="flex flex-col gap-5">
            {questions.map((item, index) => (
              <div
                key={item.id}
                className="group hover:border-main-400 flex flex-col justify-between gap-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md md:flex-row md:items-center"
              >
                <div className="flex flex-col gap-3">
                  <p className="b1 leading-relaxed font-bold text-gray-900">
                    <span className="text-main-500 mr-2">Q{index + 1}.</span>
                    {item.question}
                  </p>

                  {item.tags && item.tags.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-2">
                      {item.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="group-hover:bg-main-50 group-hover:text-main-600 rounded-md bg-gray-100 px-3 py-1.5 text-[13px] font-medium text-gray-700 transition-colors"
                        >
                          # {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* 면접 시작 버튼*/}
                <div className="shrink-0 pt-2 md:pt-0">
                  <Button
                    size="sm"
                    disabled={isPending}
                    onClick={() => onStart(item)}
                    className="bg-main-400 hover:bg-main-600 flex w-full min-w-[100px] items-center justify-center gap-1.5 font-bold text-white shadow-sm transition-colors md:w-auto"
                  >
                    {isPending ? '준비 중...' : '면접 시작'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AiNextSection;
