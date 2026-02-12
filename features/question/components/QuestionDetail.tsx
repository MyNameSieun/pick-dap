'use client';

import { Button } from '@/components/ui/button/Button';
import { Sparkle, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface QuestionDetailProps {
  idx: number;
  slug: string;
}

const QuestionDetail = ({ idx, slug }: QuestionDetailProps) => {
  const router = useRouter();

  return (
    <>
      <div className="mt-10 flex gap-5">
        <Button
          onClick={() => router.push(`/question/${idx}/${slug}/list`)}
          variant={'white'}
          className="text-gray-1000 b1 flex-1 gap-2 py-7 font-bold"
        >
          <Users />
          다른 사람 답변 비교
        </Button>
        <Button
          onClick={() => router.push(`/question/${idx}/${slug}/ai`)}
          variant={'white'}
          className="text-gray-1000 b1 flex-1 gap-2 py-7 font-bold"
        >
          <Sparkle />
          AI 답변 분석
        </Button>
      </div>
    </>
  );
};
export default QuestionDetail;
