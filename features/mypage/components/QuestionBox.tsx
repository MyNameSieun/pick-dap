'use client';
import Tags from '@/components/common/Tags/Tags';
import { Button } from '@/components/ui/button/Button';
import { Bookmark, Dot, Eye, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const QuestionBox = () => {
  const router = useRouter();

  const handleButtonClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(path);
  };

  return (
    <Link href={'/question/3'}>
      <article className="flex flex-1 cursor-pointer flex-col gap-5.5 rounded-[7] border border-gray-400 p-3">
        <div>
          <Tags className="mr-1" color="green" size="big">
            답변 완료
          </Tags>
          <Tags className="mr-1" color="green" size="big">
            답변 완료
          </Tags>
        </div>

        <h6>JVM의 구조와 Java의 실행방식을 설명해주세요.</h6>

        <div className="text-icon-default c2 flex items-center justify-between">
          <div className="flex gap-2">
            <time className="">답변일: 2026-01-04</time>
            <Dot size={15} />
            <div className="flex gap-3">
              <div className="flex items-center gap-0.5">
                <Eye size={12} />
                <p>45</p>
              </div>
              <div className="flex items-center gap-0.5">
                <Bookmark size={12} />
                <p>8</p>
              </div>
              <div className="flex items-center gap-0.5">
                <MessageSquare size={12} />
                <p>42</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-1 font-bold">
            <Button className="h-10" onClick={(e) => handleButtonClick(e, '/')}>
              답변하기
            </Button>
            <Button
              variant={'white'}
              className="h-10"
              onClick={(e) => handleButtonClick(e, '/interview')}
            >
              면접 연습
            </Button>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default QuestionBox;
