import { Brain } from 'lucide-react';

const AiThinkingBubble = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 py-20">
      <div className="relative">
        <div className="bg-main-100/30 absolute -inset-4 animate-pulse rounded-full blur-xl"></div>
        <div className="border-main-100 relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 bg-white shadow-inner">
          <div className="from-main-500/20 animate-scan absolute inset-0 bg-linear-to-t to-transparent"></div>
          <Brain size={42} className="text-main-500 animate-pulse" />
        </div>
        <div className="bg-main-400 absolute -top-2 -right-2 h-4 w-4 animate-bounce rounded-full shadow-lg delay-75"></div>
        <div className="bg-main-300 absolute -bottom-1 -left-1 h-3 w-3 animate-bounce rounded-full shadow-md delay-150"></div>
      </div>

      <div className="flex animate-pulse flex-col items-center gap-3 text-center">
        <h4 className="from-main-600 text-main-400">
          픽답 AI가 질문을 추출하고 있습니다
        </h4>
        <p className="b2 leading-relaxed text-gray-500">
          작성하신 내용을 바탕으로
          <br />
          날카로운 질문들을 뽑아내고 있어요. 잠시만 기다려주세요!
        </p>
      </div>
    </div>
  );
};

export default AiThinkingBubble;
