'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input/Input';
import { AnswerEntity } from '@/types/entity';
import Image from 'next/image';
import { useState } from 'react';
import { useCreateComment } from '../../hooks/comment/useCreateComment';
import { useFetchComment } from '../../hooks/comment/useFetchComment';
import defaultProfile from '@/public/defaultProfile.png';
import Loader from '@/components/ui/Loader';
import { Heart, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CommentItemtemProps {
  answerData: AnswerEntity;
}

const CommentInput = ({ answerData }: CommentItemtemProps) => {
  const [content, setContent] = useState('');
  const [replyingCommentId, setReplyingCommentId] = useState<string | null>(
    null,
  );
  const [reply, setReply] = useState('');

  // 댓글 등록
  const { mutate: createComment, isPending } = useCreateComment({
    onSuccess: () => {
      setContent('');
      setReply('');
      setReplyingCommentId(null);
    },
  });

  const { data: comments, isLoading } = useFetchComment(answerData.id);

  // 답글 등록
  const handleCreateReplyButton = (commentId: string) => {
    if (!reply.trim()) return;
    createComment({
      content: reply,
      answer_id: answerData.id,
      parent_id: commentId,
      post_id: null,
    });
  };

  if (isLoading) return <Loader />;

  return (
    <div className="flex flex-col gap-4">
      <div className="mb-2 flex items-center gap-2">
        <MessageSquare size={16} className="text-blue-500" />
        <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
          <span>댓글</span>
          <span>{comments?.length ?? 0}개</span>
        </div>
      </div>

      <div className="flex w-full flex-col gap-6">
        <div className="flex items-center gap-3">
          <Input
            placeholder="댓글을 입력하세요."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button
            disabled={!content.trim() || isPending}
            onClick={() =>
              createComment({
                content,
                answer_id: answerData.id,
                parent_id: null,
                post_id: null,
              })
            }
            className="c1 h-10 rounded bg-gray-900 text-white disabled:bg-gray-500"
          >
            등록
          </Button>
        </div>

        <div className="flex flex-col gap-8">
          {comments?.map((comment) => (
            <div key={comment.id} className="flex flex-col gap-3">
              <article className="flex gap-4">
                <Image
                  className="h-8 w-8 shrink-0 rounded-full border border-gray-200"
                  // depth가 0보다 크면(답글이면) 왼쪽 여백
                  style={{
                    marginLeft:
                      comment.depth > 0
                        ? `${Math.min(comment.depth * 2, 4)}rem`
                        : '0',
                  }}
                  src={comment.author.avatar_url || defaultProfile}
                  height={32}
                  width={32}
                  alt="사용자"
                />
                <div className="flex w-full flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="b2 font-bold text-gray-900">
                      {comment.author.nickname}
                    </span>
                    <time className="c1 text-gray-500">
                      {new Date(comment.created_at).toLocaleDateString()}
                    </time>
                  </div>
                  <p className="b2 leading-relaxed text-gray-800">
                    {comment.content}
                  </p>

                  <div className="mt-1 flex items-center gap-3">
                    <div className="c1 flex items-center gap-1 text-gray-500">
                      <Heart
                        fill={comment.like_count > 0 ? 'currentColor' : 'none'}
                        className={cn(
                          'cursor-pointer',
                          comment.like_count > 0
                            ? 'text-red-500'
                            : 'text-gray-400',
                        )}
                        size={14}
                      />
                      {comment.like_count ?? 0}
                    </div>
                    <button
                      onClick={() => setReplyingCommentId(comment.id)}
                      className="c1 hover:text-gray-90 cursor-pointer0 text-gray-500"
                    >
                      답글
                    </button>
                  </div>
                </div>
              </article>

              {replyingCommentId === comment.id && (
                <div
                  className="ml-12 flex flex-col gap-3 rounded-lg bg-gray-50 p-4"
                  style={{
                    marginLeft:
                      comment.depth > 0
                        ? `${Math.min(comment.depth * 2, 4)}rem`
                        : '0',
                  }}
                >
                  <textarea
                    className="b2 w-full resize-none border-b border-gray-300 bg-transparent p-2 outline-none focus:border-gray-900"
                    placeholder="답글을 남겨보세요"
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    rows={2}
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setReplyingCommentId(null)}
                      className="c1 rounded px-3 py-1.5 text-gray-600 hover:bg-gray-200"
                    >
                      취소
                    </button>
                    <button
                      onClick={() => handleCreateReplyButton(comment.id)}
                      disabled={!reply.trim() || isPending}
                      className="c1 rounded bg-gray-900 px-3 py-1.5 text-white disabled:bg-gray-300"
                    >
                      답글 등록
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentInput;
