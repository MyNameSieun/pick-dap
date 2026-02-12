'use client';
import EmptyStateBox from '@/components/common/EmptyStateBox/EmptyStateBox';
import Line from '@/components/common/Line';
import { Button } from '@/components/ui/button/Button';
import { Input } from '@/components/ui/input/Input';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import { AnswerQuestionJoinType } from '../services/fetchAnswerQuestion';

const QuestionListAnswers = () => {
  return (
    <div>
      {/* {comment.length === 0 ? (
        <>
          <EmptyStateBox buttonName="d" description="d" title="s" />
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
      )} */}
    </div>
  );
};

export default QuestionListAnswers;
