import HeaderTitleBox from '@/components/common/HeaderTitleBox';
import QuestionHeader from '../../../../features/question/components/QuestionHeader';
import BackButton from '@/components/common/BackButton';
import { Crown, Heart } from 'lucide-react';
import Line from '@/components/common/Line';
import Image from 'next/image';
import { Input } from '@/components/ui/input/Input';
import { Button } from '@/components/ui/button/Button';
import qustionCommentData from '@/data/questionCommentData.json';
import EmptyStateBox from '@/features/question/components/EmptyStateBox';

const QuestionPage = () => {
  const comment = qustionCommentData.map((data) => data.comment);
  return (
    <>
      <BackButton label={'질문으로 돌아가기'} />
      <QuestionHeader />

      <div className="text-gray-1000 b1 mt-15.5 mb-6">
        <HeaderTitleBox
          icon={Crown}
          title={'다른 사람 답변 비교'}
          content={`총 ${comment.length}개의 답변이 있습니다.`}
        />
      </div>

      {comment.length === 0 ? (
        <>
          <EmptyStateBox />
        </>
      ) : (
        <section className="flex flex-col gap-6">
          {qustionCommentData.map(({ comment, replies }) => (
            <article key={comment.id} className="rounded-[16] bg-white p-8">
              <div className="flex justify-between">
                <div>추후 프로필 추가</div>
                <Button variant={'white'}>
                  <Heart />
                  {comment.likeCount}
                </Button>
              </div>
              d<div className="mt-8">{comment.content}</div>
              <Line />
              <div className="flex flex-col gap-6">
                {replies.map((reply) => (
                  <div key={reply.id} className="flex gap-4">
                    <Image
                      className="fe h-6 w-6 rounded-full"
                      src="/profile.jpg"
                      height={16}
                      width={16}
                      alt="이미지"
                    />
                    <div className="flex flex-col gap-2">
                      <div className="text-gray-1000 flex gap-2">
                        <p className="b1 font-bold">{reply.author.nickname}</p>
                        <time className="c1 text-gray-700">
                          {reply.createdAt
                            ? new Date(reply.createdAt).toLocaleDateString()
                            : null}
                        </time>
                      </div>
                      <p className="text-gray-1000">{reply.content}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-7 flex items-center gap-5">
                <Input placeholder="댓글을 입력하세요." />
                <Button variant={'default'} className="h-10">
                  등록
                </Button>
              </div>
            </article>
          ))}
        </section>
      )}
    </>
  );
};

export default QuestionPage;
