'use client';

import Tags from '@/components/common/Tags';
import { Bookmark, Send } from 'lucide-react';
import { useParams, usePathname } from 'next/navigation';
import questionData from '@/data/questionData.json';
import { Textarea } from '@/components/ui/Textarea';
import Line from '@/components/common/Line';
import { Button } from '@/components/ui/button/Button';
import { toast } from 'sonner';

const QuestionHeader = () => {
  const pathname = usePathname();
  const params = useParams();

  const data = questionData.find((question) => question.id === params.id);
  if (!data) return <p>존재하지 않는 질문입니다.</p>;

  const onClickSaveButtonHandler = () => {
    toast.success('마이페이지에 저장이 완료되었습니다!', {
      position: 'top-center',
    });
  };

  return (
    <div className="rounded-[4] bg-white p-8 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <Tags color="blue" size="big">
            CS
          </Tags>
          <Tags color="purple" size="big">
            OS
          </Tags>
        </div>
        {pathname.startsWith(`/question/${params.id}`) &&
        !pathname.endsWith('/ai') ? (
          <>
            <Button variant={'white'} onClick={onClickSaveButtonHandler}>
              <Bookmark />
              저장
            </Button>
          </>
        ) : null}
      </div>

      {pathname === `/question/${params.id}` ? (
        <>
          <h2 className="mt-8 mb-15">{data?.title}</h2>
          {/* <AuthorInfo  /> */}
          <div className="">프로필(추후 대체)</div>
          <div className="mt-8 mb-8 border border-gray-100" />

          <h3 className="mb-6">나의 답변 작성</h3>
          <Textarea
            placeholder="이 질문에 대한 답변을 작성해보세요"
            className="bg-bg-default b1 h-45 p-4"
          />
          <div className="flex w-full justify-end">
            <Button className="mt-4 gap-3.5" variant={'default'}>
              <Send />
              답변 저장
            </Button>
          </div>
        </>
      ) : (
        <>
          <h2 className="mt-8 mb-15">{data?.title}</h2>

          <Line />

          <div className="b1 text-gray-1000">{data.content}</div>
        </>
      )}
    </div>
  );
};

export default QuestionHeader;
