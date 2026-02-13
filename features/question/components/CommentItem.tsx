'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input/Input';
import { AnswerEntity, CommentEntity } from '@/types/entity';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';
import { useCreateComment } from '../hooks/comment/useCreateComment';

interface CommentItemtemProps {
  answerData: AnswerEntity;
}
const CommentItem = ({ answerData }: CommentItemtemProps) => {
  const [content, setContent] = useState('');

  // 등록
  const { mutate: createComment, isPending } = useCreateComment({
    onSuccess: () => {
      setContent('');
      alert('댓글이 등록되었습니다.');
    },
    onError: (error: Error) => {
      toast.error('댓글 등록에 실패하였습니다.');
      console.log(error);
    },
  });

  const handleCreateCommentButton = () => {
    createComment({
      content,
      answer_id: answerData.id,
      parent_id: null,
      post_id: null,
    });
  };

  return (
    <>
      <div key={answerData.id} className="flex gap-4">
        <Image
          className="fe h-6 w-6 rounded-full"
          src="/profile.jpg"
          height={16}
          width={16}
          alt="이미지"
        />
        <div className="flex flex-col gap-2">
          <div className="text-gray-1000 flex gap-2">
            {/* <p className="b1 font-bold">{answer.author.nickname}</p> */}
            <time className="c1 text-gray-700">
              {answerData.created_at
                ? new Date(answerData.created_at).toLocaleDateString()
                : null}
            </time>
          </div>
          <p className="text-gray-1000">{answerData.answer}</p>
        </div>
      </div>
      <div className="mt-7 flex items-center gap-5">
        <Input
          placeholder="댓글을 입력하세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button
          onClick={handleCreateCommentButton}
          variant={'default'}
          className="h-10"
        >
          등록
        </Button>
      </div>
    </>
  );
};

export default CommentItem;
