'use client';

import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input/Input';
import { Button } from '@/components/ui/button/Button';
import { Send, User, HelpCircle, ChevronRight, Loader2 } from 'lucide-react';
import BackButton from '@/components/common/BackButton';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { GenerateQuestionsResponse } from '../hooks/fetchGenerateQuestions';

type Message = {
  id: number;
  target: 'pickbot' | 'user';
  message: string;
};

type InterviewRoomProps = {
  question: GenerateQuestionsResponse;
  onExit: () => void;
};

const InterviewRoom = ({ question, onExit }: InterviewRoomProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: Date.now(),
      target: 'pickbot',
      message: `반갑습니다! 선택하신 질문에 대해 면접을 시작해볼까요? \n\n질문: ${question.question}`,
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isHintMode, setIsHintMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // AI 응답 대기 상태

  const scrollRef = useRef<HTMLDivElement>(null);

  // 메시지 추가 시 자동 스크롤
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // [기능] 메시지 전송 로직
  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const newUserMessage: Message = {
      id: Date.now(),
      target: 'user',
      message: text,
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue('');
    setIsLoading(true);

    // TODO: fetch('/api/interview/chat', { method: 'POST', ... }) 호출 로직이 들어갈 자리입니다.
    // 현재는 시뮬레이션을 위해 setTimeout을 사용합니다.
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now() + 1,
        target: 'pickbot',
        message: isHintMode
          ? `[힌트 가이드] 💡\n이 질문은 '${question.tags?.[0] || '해당 역량'}'을 확인하기 위한 질문입니다. 과거에 비슷한 상황에서 본인이 어떻게 행동했는지 구체적인 사례를 떠올려보세요!`
          : '답변 감사합니다. 추가로 궁금한 점이 생겼는데요, 해당 상황에서 가장 어려웠던 점은 무엇이었나요?',
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };

  // [기능] "잘 모르겠어요" 클릭 시
  const handleRequestHint = () => {
    setIsHintMode(true);
    handleSendMessage(
      '이 질문에 답변하기가 조금 어려워요. 어떤 식으로 답변하면 좋을지 가이드를 주실 수 있나요?',
    );
  };

  return (
    <div className="flex h-screen flex-col bg-[#F8F9FB]">
      {/* 헤더 */}
      <div className="border-b border-gray-100 bg-white px-6 py-4 shadow-sm">
        <BackButton
          onClick={onExit}
          label={
            <p className="b1 text-gray-900">
              <b>면접 종료 및 나가기</b>
            </p>
          }
        />
      </div>

      {/* 대화창 */}
      <div
        ref={scrollRef}
        className="flex flex-1 flex-col gap-6 overflow-y-auto p-6"
      >
        {messages.map((v, idx) => {
          const isPickbot = v.target === 'pickbot';
          return (
            <div
              key={v.id || idx}
              className={twMerge(
                'flex w-full items-start gap-4',
                isPickbot ? 'justify-start' : 'justify-end',
              )}
            >
              {isPickbot && (
                <div className="h-[48px] w-[48px] shrink-0 overflow-hidden rounded-full border border-gray-200 bg-white shadow-sm">
                  <Image
                    src="/pickbotCircle.png"
                    alt="픽봇"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
              )}
              <div
                className={twMerge(
                  'max-w-[75%] rounded-[20px] p-5 text-[15px] leading-relaxed whitespace-pre-wrap shadow-sm transition-all',
                  isPickbot
                    ? 'rounded-tl-none border border-gray-200 bg-white text-gray-900'
                    : 'bg-main-500 rounded-tr-none text-white',
                )}
              >
                {v.message}
              </div>
              {!isPickbot && (
                <div className="bg-main-100 border-main-200 flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full border shadow-sm">
                  <User size={24} className="text-main-500" />
                </div>
              )}
            </div>
          );
        })}
        {isLoading && (
          <div className="flex animate-pulse justify-start gap-4">
            <div className="h-12 w-12 rounded-full bg-gray-200" />
            <div className="h-16 w-32 rounded-[20px] bg-gray-100" />
          </div>
        )}
      </div>

      {/* 하단 제어 영역 */}
      <div className="shrink-0 border-t border-gray-200 bg-white p-6 pb-10">
        <div className="mx-auto flex max-w-4xl flex-col gap-4">
          {/* 잘 모르겠어요 버튼 (힌트 모드가 아닐 때만 노출) */}
          {!isHintMode && !isLoading && (
            <button
              onClick={handleRequestHint}
              className="hover:text-main-500 flex w-fit items-center gap-2 px-1 text-gray-500 transition-colors"
            >
              <HelpCircle size={18} />
              <span className="b2 font-medium">잘 모르겠나요? 힌트 얻기</span>
            </button>
          )}

          {/* 입력창 또는 복귀 버튼 */}
          <div className="relative">
            {isHintMode ? (
              <Button
                onClick={() => setIsHintMode(false)}
                className="bg-main-100 border-main-200 text-main-500 hover:bg-main-200 flex h-14 w-full items-center justify-center gap-2 rounded-xl border-2 text-lg font-bold transition-all"
              >
                가이드를 확인했습니다. 이제 답변할게요!
                <ChevronRight size={20} />
              </Button>
            ) : (
              <>
                <Input
                  inputSize="lg"
                  className="text-gray-1000 focus:ring-main-500 h-14 w-full rounded-xl pr-12"
                  placeholder={
                    isLoading
                      ? '픽봇이 생각 중입니다...'
                      : '답변을 입력하세요...'
                  }
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === 'Enter' && handleSendMessage(inputValue)
                  }
                  disabled={isLoading}
                />
                <button
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={!inputValue.trim() || isLoading}
                  className="text-main-500 hover:text-main-600 absolute top-1/2 right-3 -translate-y-1/2 p-2 transition-colors disabled:text-gray-300"
                >
                  {isLoading ? (
                    <Loader2 size={24} className="animate-spin" />
                  ) : (
                    <Send size={24} />
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewRoom;
