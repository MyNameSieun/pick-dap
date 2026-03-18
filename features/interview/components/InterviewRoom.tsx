'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import {
  Send,
  User,
  HelpCircle,
  ChevronRight,
  Loader2,
  ChevronLeft,
} from 'lucide-react';

import { Input } from '@/components/ui/input/Input';
import { Button } from '@/components/ui/button/Button';

import { useFetchAiInterview } from '../hooks/useFetchAiInterview';
import { useFetchMessages } from '../hooks/useFetchMessages';
import { useSendAnswer } from '../hooks/useSendAnswer';
import Loader from '@/components/ui/Loader';
import { useRouter } from 'next/navigation';

interface InterviewRoomProps {
  interviewId: string;
}

const InterviewRoom = ({ interviewId }: InterviewRoomProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [isHintMode, setIsHintMode] = useState(false);
  const router = useRouter();

  // 1. 면접 방 정보 가져오기 (카테고리 타입 등)
  const { data: interview, isLoading: isInfoLoading } =
    useFetchAiInterview(interviewId);

  // 2. 채팅 메시지 내역 가져오기 (DB에서 실시간 조회)
  const { data: messages = [], isLoading: isMessagesLoading } =
    useFetchMessages(interviewId);

  // 3. 답변 전송 및 AI 응답 생성 훅
  const { mutate: sendAnswer, isPending: isAiThinking } =
    useSendAnswer(interviewId);

  // 메시지가 추가되거나 AI가 생각 중일 때 하단으로 자동 스크롤
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isAiThinking]);

  // 메시지 전송 로직
  const handleSendMessage = (text: string) => {
    if (!text.trim() || isAiThinking || !interview) return;

    // 서버 액션 실행 (내 답변 저장 + AI 답변 생성 및 저장)
    sendAnswer({
      interviewId: interviewId,
      content: text,
      categoryType: interview.category_type,
    });

    setInputValue('');
    setIsHintMode(false);
  };

  // "잘 모르겠어요" 클릭 시 (힌트 요청)
  const handleRequestHint = () => {
    setIsHintMode(true);
    handleSendMessage(
      '이 질문에 답변하기가 조금 어려워요. 어떤 식으로 답변하면 좋을지 가이드를 주실 수 있나요?',
    );
  };

  if (isInfoLoading || isMessagesLoading) return <Loader />;

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-white text-gray-900">
      <header className="flex h-25 items-center border-b border-gray-200 bg-white/70 px-4 shadow-md">
        <div className="flex flex-1 justify-center">
          <div className="relative">
            <h1 className="truncate text-sm font-bold text-gray-900">
              {interview?.title || `${interview?.category_type} 면접 연습`}
            </h1>

            <button
              onClick={() => router.back()}
              className="text-main-500 absolute top-0 left-[-150px] flex items-center gap-1 text-sm font-semibold"
            >
              <ChevronLeft size={18} />
              Exit
            </button>
          </div>
        </div>
      </header>

      <main
        ref={scrollRef}
        className="custom-scrollbar flex-1 overflow-y-auto bg-[#FAFAFA] px-6 pt-8 pb-32"
      >
        <div className="mx-auto flex max-w-3xl flex-col gap-8">
          {messages.map((msg) => {
            const isBot = msg.chat_role === 'pickbot';
            return (
              <div
                key={msg.id}
                className={twMerge(
                  'animate-in fade-in slide-in-from-bottom-2 flex w-full items-start gap-4 duration-500',
                  isBot ? 'justify-start' : 'justify-end',
                )}
              >
                {isBot && (
                  <div className="mt-1 h-9 w-9 shrink-0 overflow-hidden rounded-full border border-gray-100 bg-white shadow-sm">
                    <Image
                      src="/pickbotCircle.png"
                      alt="bot"
                      width={36}
                      height={36}
                      className="object-cover"
                    />
                  </div>
                )}
                <div
                  className={twMerge(
                    'max-w-[75%] text-[14.5px] leading-relaxed tracking-tight whitespace-pre-wrap shadow-sm',
                    isBot
                      ? 'rounded-3xl rounded-tl-none border border-gray-100 bg-white px-5 py-3.5 text-gray-800'
                      : 'rounded-3xl rounded-tr-none bg-blue-600 px-5 py-3.5 font-medium text-white shadow-blue-50',
                  )}
                >
                  {msg.content}
                </div>
                {!isBot && (
                  <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-blue-100 bg-blue-50 text-blue-600 shadow-sm">
                    <User size={18} />
                  </div>
                )}
              </div>
            );
          })}

          {isAiThinking && (
            <div className="flex animate-pulse items-center gap-4">
              <div className="h-9 w-9 rounded-full bg-gray-200" />
              <div className="flex h-11 w-20 items-center justify-center rounded-2xl rounded-tl-none border border-gray-100 bg-white shadow-sm">
                <div className="flex gap-1.5">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-300 [animation-delay:-0.3s]"></span>
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-300 [animation-delay:-0.15s]"></span>
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-300"></span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="shrink-0 border-t border-gray-100 bg-white p-6 pb-10">
        <div className="mx-auto flex max-w-3xl flex-col gap-4">
          {!isHintMode && !isAiThinking && (
            <button
              onClick={handleRequestHint}
              className="flex w-fit items-center gap-2 rounded-full bg-yellow-400/10 px-4 py-1.5 text-[11px] font-bold text-yellow-700 shadow-sm transition-all hover:bg-yellow-400/20 active:scale-95"
            >
              <HelpCircle size={14} />잘 모르겠어요
            </button>
          )}

          <div className="relative">
            {isHintMode ? (
              <Button
                onClick={() => setIsHintMode(false)}
                className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 text-sm font-bold text-white shadow-lg shadow-blue-100 transition-all hover:bg-blue-700 active:scale-[0.98]"
              >
                가이드를 확인했습니다. 답변 시작하기
                <ChevronRight size={18} />
              </Button>
            ) : (
              <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-50">
                <Input
                  className="h-14 border-none bg-transparent px-6 text-[15px] placeholder:text-gray-400 focus-visible:ring-0"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
                      e.preventDefault();
                      handleSendMessage(inputValue);
                    }
                  }}
                  placeholder={'답변을 입력하세요.'}
                />
                <button
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={!inputValue.trim() || isAiThinking}
                  className="absolute top-1/2 right-3 -translate-y-1/2 rounded-xl p-2.5 text-blue-600 transition-all hover:bg-blue-50 disabled:text-gray-200"
                >
                  {isAiThinking ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <Send size={20} />
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
};
export default InterviewRoom;
