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
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isHintMode, setIsHintMode] = useState(false);
  const router = useRouter();

  const { data: interview, isLoading: isInfoLoading } =
    useFetchAiInterview(interviewId);

  const { data: messages = [], isLoading: isMessagesLoading } =
    useFetchMessages(interviewId);

  const { mutate: sendAnswer, isPending: isAiThinking } =
    useSendAnswer(interviewId);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isAiThinking]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [inputValue]);
  const handleSendMessage = (text: string) => {
    if (!text.trim() || isAiThinking || !interview) return;

    sendAnswer({
      interviewId: interviewId,
      content: text,
      categoryType: interview.category_type,
    });

    setInputValue('');
    setIsHintMode(false);

    setTimeout(() => {
      textareaRef.current?.focus();
    }, 0);
  };

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
          <h1 className="max-w-[600px] pl-4 text-center -indent-4 text-sm font-bold break-keep text-gray-900">
            {interview?.title || `${interview?.category_type} 면접 연습`}
          </h1>
          <button
            onClick={() => router.back()}
            className="text-main-500 absolute top-10 left-[300px] flex items-center gap-1 text-sm font-semibold"
          >
            <ChevronLeft size={18} />
            Exit
          </button>
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
                <textarea
                  ref={textareaRef}
                  rows={1}
                  className="custom-scrollbar w-full resize-none border-none bg-transparent px-6 py-4 pr-14 text-[15px] placeholder:text-gray-400 focus:ring-0 focus:outline-none"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
                      if (e.shiftKey) {
                        return;
                      }
                      e.preventDefault();
                      handleSendMessage(inputValue);
                    }
                  }}
                  placeholder={'답변을 입력하세요.'}
                />
                <button
                  onClick={() => handleSendMessage(inputValue)}
                  className="text-main-500 absolute right-3 bottom-2 rounded-xl bg-blue-50 p-2.5 transition-all disabled:text-gray-200"
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
