import { User } from 'lucide-react';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

const InterviewMessage = ({ target, message }: InterviewMessageProps) => {
  const isPickbot = target === 'pickbot';

  return (
    <>
      <div
        className={twMerge(
          'flex items-start gap-4',
          isPickbot ? 'justify-start' : 'justify-end',
        )}
      >
        {isPickbot && (
          <Image
            src="/pickbotCircle.png"
            alt="픽봇프로필"
            width={64}
            height={64}
          />
        )}
        <div
          className={twMerge(
            'h-fit w-fit rounded-[16px] border border-gray-300 p-6 whitespace-pre-wrap',
            isPickbot ? 'bg-bg-light text-black' : 'bg-main-400 text-white',
          )}
        >
          {message}
        </div>
        {!isPickbot && (
          <User
            className="bg-main-400 rounded-full p-3 text-white"
            width={64}
            height={64}
          />
        )}
      </div>
    </>
  );
};
export default InterviewMessage;
