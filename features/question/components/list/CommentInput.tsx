'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input/Input';
import { AnswerEntity, CommentEntity } from '@/types/entity';
import Image from 'next/image';
import { useState } from 'react';
import { useCreateComment } from '../../hooks/comment/useCreateComment';
import { useFetchComment } from '../../hooks/comment/useFetchComment';
import defaultProfile from '@/public/defaultProfile.png';
import Loader from '@/components/ui/Loader';
import { MessageSquare, Pencil, Siren, Trash2 } from 'lucide-react';
import MoreOptionsMenu from '@/components/common/MoreOptionsMenu';
import { useSession } from '@/store/session';
import { toast } from 'sonner';
import { useUpdateComment } from '../../hooks/comment/useUpdateComment';
import { isUpdateWrite } from '@/lib/isUpdateWrite';
import LikeCommentButton from './LikeCommentButton';
import { useDeleteAnswerComment } from '../../hooks/comment/useDeleteAnswerComment';

interface CommentItemProps {
  answerData: AnswerEntity;
}

const CommentInput = ({ answerData }: CommentItemProps) => {
  const [content, setContent] = useState('');
  const [replyingCommentId, setReplyingCommentId] = useState<string | null>(
    null,
  );

  const [reply, setReply] = useState('');

  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const user = useSession()?.user;

  // 댓글 조회
  const { data: comments, isLoading } = useFetchComment(answerData.id);

  // 댓글 등록
  const { mutate: createComment, isPending } = useCreateComment({
    onSuccess: () => {
      setContent('');
      setReply('');
      setReplyingCommentId(null);
    },
  });

  const handleCreateCommentButton = (commentId: string) => {
    if (!reply.trim()) return;
    createComment({
      content: reply,
      answer_id: answerData.id,
      parent_id: commentId,
      post_id: null,
    });
  };

  // 댓글 삭제
  const { mutate: deleteCommentMutate } = useDeleteAnswerComment();
  const handleCommentDeleteButton = (commentId: string) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      deleteCommentMutate({ commentId });
    }
  };

  // 댓글 수정
  const handleCommentEditButton = (comment: CommentEntity) => {
    setReplyingCommentId(null);
    setEditingCommentId(comment.id);
    setEditValue(comment.content);
  };

  const { mutate: commnetUpdateMutate, isPending: isCommentUpdatePending } =
    useUpdateComment({
      onSuccess: () => {
        setEditingCommentId(null);
        toast.success('수정되었습니다!', { position: 'top-center' });
      },
    });
  const handleCommentUpdateButton = (comment: CommentEntity) => {
    if (!editValue.trim()) return;
    if (comment.content === editValue) return;

    commnetUpdateMutate({ id: comment.id, content: editValue });
  };

  if (isLoading) return <Loader />;

  return (
    <div className="flex flex-col gap-4">
      {/* 댓글 */}
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
            className="c1 h-10 rounded bg-gray-900 text-white disabled:bg-gray-700"
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
                      comment.depth > 0 ? `${comment.depth * 2}rem` : '0',
                  }}
                  src={comment.author.avatar_url || defaultProfile}
                  height={32}
                  width={32}
                  alt="사용자"
                />
                {/* 수정모드 분기처리 */}
                <div className="flex w-full items-center justify-between gap-1">
                  {editingCommentId === comment.id ? (
                    <div className="flex flex-1 flex-col gap-3">
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-center gap-2">
                          <span className="b2 font-bold text-gray-900">
                            {comment.author.nickname}
                          </span>
                        </div>
                        <input
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="b2 border-b pb-3 leading-relaxed text-gray-800 outline-none focus:border-gray-600"
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setEditingCommentId(null)}
                          className="c1 rounded px-3 py-1.5 text-gray-600 hover:bg-gray-200"
                        >
                          취소
                        </button>
                        <button
                          disabled={
                            isCommentUpdatePending ||
                            editValue === comment.content ||
                            editValue.trim() === ''
                          }
                          onClick={() => handleCommentUpdateButton(comment)}
                          className="c1 rounded bg-gray-900 px-3 py-1.5 text-white disabled:bg-gray-300"
                        >
                          수정 완료
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="b2 font-bold text-gray-900">
                            {comment.author.nickname}
                          </span>
                          <time className="c1 text-gray-500">
                            {isUpdateWrite(
                              comment.created_at,
                              comment.updated_at,
                            ) ? (
                              <p>
                                {new Date(comment.created_at).toLocaleString()}
                              </p>
                            ) : (
                              <p>
                                {new Date(comment.updated_at).toLocaleString()}
                                (수정됨)
                              </p>
                            )}
                          </time>
                        </div>
                        <p className="b2 leading-relaxed text-gray-800">
                          {comment.content}
                        </p>

                        <div className="mt-1 flex items-center gap-3">
                          {/* 좋아요 버튼 */}
                          <LikeCommentButton
                            comment={comment}
                            answerId={answerData.id}
                          />
                          <button
                            onClick={() => setReplyingCommentId(comment.id)}
                            className="c1 hover:text-gray-90 cursor-pointer0 text-gray-500"
                          >
                            답글
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                  {editingCommentId !== comment.id && (
                    <MoreOptionsMenu>
                      {user?.id === comment.user_id ? (
                        <>
                          <button
                            onClick={() => handleCommentEditButton(comment)}
                            className="group flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100"
                          >
                            <Pencil
                              size={16}
                              className="text-gray-400 group-hover:text-gray-600"
                            />
                            <span>수정하기</span>
                          </button>

                          <button
                            onClick={() =>
                              handleCommentDeleteButton(comment.id)
                            }
                            className="group flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100 disabled:opacity-50"
                          >
                            <Trash2
                              size={16}
                              className="text-gray-400 group-hover:text-gray-600 hover:bg-gray-100"
                            />
                            <span>삭제하기</span>
                          </button>
                        </>
                      ) : (
                        <>
                          <button className="group flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100 disabled:opacity-50">
                            <Siren
                              size={16}
                              className="text-gray-400 group-hover:text-gray-600 hover:bg-gray-100"
                            />
                            <span>신고</span>
                          </button>
                        </>
                      )}
                    </MoreOptionsMenu>
                  )}
                </div>
              </article>

              {/* 답글 */}
              {replyingCommentId === comment.id && (
                <div
                  className="flex flex-col gap-3 rounded-lg bg-gray-50 p-4"
                  style={{
                    // 부모 댓글의 depth보다 한 단계 더 들어간 위치에 입력창 표시
                    marginLeft: `${(comment.depth + 1) * 2}rem`,
                  }}
                >
                  <textarea
                    className="b2 w-full resize-none border-b border-gray-300 bg-transparent p-2 outline-none focus:border-gray-700"
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
                      onClick={() => handleCreateCommentButton(comment.id)}
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
