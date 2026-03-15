'use client';

import { useState } from 'react';
import NextImage from 'next/image';
import { MessageSquare, Trash2, Pencil, CornerDownRight } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button/Button';
import { Input } from '@/components/ui/input/Input';
import MoreOptionsMenu from '../MoreOptionsMenu';

import { useCreateComment } from '@/features/question/hooks/comment/useCreateComment';
import { useUpdateComment } from '@/features/question/hooks/comment/useUpdateComment';
import defaultProfile from '@/public/defaultProfile.png';
import { useFetchPostComment } from '@/features/community/hooks/useFetchPostComment';
import { useSession } from '@/store/session';
import Loader from '@/components/ui/Loader';
import { cn } from '@/lib/utils';
import { useDeletePostComment } from '@/features/community/hooks/useDeletePostComment';

interface CommentEditorProps {
  postId: string;
}

const CommentEditor = ({ postId }: CommentEditorProps) => {
  const { data: comments, isPending: isCommentsPending } =
    useFetchPostComment(postId);
  const [content, setContent] = useState('');
  const [reply, setReply] = useState('');
  const [replyingCommentId, setReplyingCommentId] = useState<string | null>(
    null,
  );
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const user = useSession()?.user;

  const { mutate: createComment, isPending: isCreateCommentPending } =
    useCreateComment({
      onSuccess: () => {
        setContent('');
        setReply('');
        setReplyingCommentId(null);
        toast.success('댓글이 등록되었습니다.');
      },
    });

  const handleCreateButton = (parentId: string | null = null) => {
    const finalContent = parentId ? reply : content;
    if (!finalContent.trim()) return;

    createComment({
      content: finalContent,
      post_id: postId,
      parent_id: parentId,
    });
  };

  const { mutate: updateComment } = useUpdateComment({
    onSuccess: () => setEditingCommentId(null),
  });
  const { mutate: deleteComment } = useDeletePostComment();

  if (isCommentsPending)
    return (
      <div className="py-10">
        <Loader />
      </div>
    );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100/50">
            <MessageSquare size={16} className="text-main-500" />
          </div>
          <div className="flex items-center gap-1.5 font-bold">
            <span className="text-gray-900">댓글</span>
            <span className="text-main-500">{comments?.length ?? 0}</span>
          </div>
        </div>
      </div>

      <div className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-400/20">
        <textarea
          rows={3}
          placeholder="따뜻한 댓글을 남겨주세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full resize-none border-none p-4 text-[14px] outline-none placeholder:text-gray-300"
        />
        <div className="flex justify-end border-t border-gray-50 bg-gray-50/30 px-3 py-2">
          <Button
            size="sm"
            disabled={!content.trim() || isCreateCommentPending}
            onClick={() => handleCreateButton()}
            className="px-5 font-bold shadow-none"
          >
            등록
          </Button>
        </div>
      </div>

      <div className="mt-2 flex flex-col gap-3">
        {comments?.map((comment) => {
          const isReply = comment.depth > 0;

          return (
            <div
              key={comment.id}
              className={cn(
                'group relative flex flex-col rounded-xl border bg-white p-5 shadow-sm transition-all',
                isReply
                  ? 'ml-8 border-l-2 border-gray-200 pl-4 hover:border-gray-300 hover:border-l-blue-400 md:ml-12 md:pl-6'
                  : 'border-gray-200 hover:border-gray-300',
              )}
            >
              <article className="flex gap-4">
                <div className="relative shrink-0">
                  <NextImage
                    src={comment.author.avatar_url || defaultProfile}
                    alt="프로필"
                    width={36}
                    height={36}
                    className="h-9 w-9 rounded-full border border-gray-100 object-cover shadow-sm"
                  />
                  {isReply && (
                    <CornerDownRight
                      size={14}
                      className={cn(
                        'absolute top-0 -left-40 md:-left-9',
                        'text-gray-200 transition-colors duration-200',
                        'group-hover:text-blue-400',
                      )}
                    />
                  )}
                </div>

                <div className="flex flex-1 flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-bold text-gray-900">
                        {comment.author.nickname}
                      </span>
                      <span className="text-[11px] font-medium text-gray-400">
                        {new Date(comment.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    {comment.user_id === user?.id && (
                      <MoreOptionsMenu>
                        <button
                          onClick={() => {
                            setEditingCommentId(comment.id);
                            setEditValue(comment.content);
                          }}
                          className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] transition-colors hover:bg-gray-50"
                        >
                          <Pencil size={14} /> 수정
                        </button>
                        <button
                          onClick={() =>
                            confirm('정말 삭제하시겠습니까?') &&
                            deleteComment({ commentId: comment.id })
                          }
                          className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] text-red-500 transition-colors hover:bg-red-50"
                        >
                          <Trash2 size={14} /> 삭제
                        </button>
                      </MoreOptionsMenu>
                    )}
                  </div>

                  {editingCommentId === comment.id ? (
                    <div className="mt-2 flex flex-col gap-2">
                      <Input
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="h-10 text-sm focus-visible:ring-blue-400"
                      />
                      <div className="flex justify-end gap-1.5">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingCommentId(null)}
                          className="h-8 text-xs font-semibold"
                        >
                          취소
                        </Button>
                        <Button
                          size="sm"
                          onClick={() =>
                            updateComment({
                              id: comment.id,
                              content: editValue,
                            })
                          }
                          className="h-8 text-xs font-semibold"
                        >
                          수정완료
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-[14px] leading-relaxed text-gray-700">
                        {comment.content}
                      </p>
                      <div className="mt-1 flex items-center gap-3">
                        <button
                          onClick={() => setReplyingCommentId(comment.id)}
                          className="text-[11px] font-bold text-gray-500 transition-colors hover:text-blue-600"
                        >
                          답글 쓰기
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </article>

              {replyingCommentId === comment.id && (
                <div className="mt-4 flex flex-col gap-2 rounded-lg border border-gray-100 bg-gray-50/50 p-3">
                  <Input
                    placeholder={`${comment.author.nickname}님에게 답글 남기기...`}
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    className="h-9 border-none bg-white px-2 text-[13px] focus-visible:ring-1 focus-visible:ring-blue-400/50"
                  />
                  <div className="flex justify-end gap-1 pt-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setReplyingCommentId(null)}
                      className="h-7 text-[11px] font-bold"
                    >
                      취소
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleCreateButton(comment.id)}
                      className="h-7 px-3 text-[11px] font-bold"
                    >
                      등록
                    </Button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommentEditor;
