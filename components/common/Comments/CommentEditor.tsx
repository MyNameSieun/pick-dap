'use client';

import { useState } from 'react';
import NextImage from 'next/image';
import { MessageSquare, Trash2, Pencil } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button/Button';
import { Input } from '@/components/ui/input/Input';
import MoreOptionsMenu from '../MoreOptionsMenu';

import { useCreateComment } from '@/features/question/hooks/comment/useCreateComment';
import { useDeleteComment } from '@/features/question/hooks/comment/useDeleteComment';
import { useUpdateComment } from '@/features/question/hooks/comment/useUpdateComment';
import defaultProfile from '@/public/defaultProfile.png';
import { useFetchPostComment } from '@/features/community/hooks/useFetchPostComment';
import { useSession } from '@/store/session';
import Loader from '@/components/ui/Loader';

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
  const { mutate: deleteComment } = useDeleteComment();
  if (isCommentsPending) return <Loader />;

  return (
    <div className="flex flex-col gap-6">
      {/* 댓글 헤더 */}
      <div className="flex items-center gap-2 border-b pb-2">
        <MessageSquare size={18} className="text-blue-500" />
        <span className="font-bold">댓글 {comments?.length ?? 0}</span>
      </div>

      {/* 댓글 입력창 */}
      <div className="flex gap-2">
        <Input
          placeholder="따뜻한 댓글을 남겨주세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button
          disabled={!content.trim() || isCreateCommentPending}
          onClick={() => handleCreateButton()}
        >
          등록
        </Button>
      </div>

      {/* 댓글 목록 */}
      <div className="flex flex-col gap-6">
        {comments?.map((comment) => (
          <div
            key={comment.id}
            style={{ marginLeft: `${comment.depth * 1.5}rem` }}
          >
            <article className="flex gap-3">
              <NextImage
                src={comment.author.avatar_url || defaultProfile}
                alt="프로필"
                width={32}
                height={32}
                className="h-8 w-8 rounded-full object-cover"
              />
              <div className="flex flex-1 flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold">
                    {comment.author.nickname}
                  </span>
                  {comment.user_id === user?.id && (
                    <MoreOptionsMenu>
                      <button
                        onClick={() => {
                          setEditingCommentId(comment.id);
                          setEditValue(comment.content);
                        }}
                        className="flex w-full items-center gap-2 p-2 text-left text-sm hover:bg-gray-100"
                      >
                        <Pencil size={14} /> 수정하기
                      </button>
                      <button
                        onClick={() =>
                          confirm('삭제하시겠습니까?') &&
                          deleteComment({ commentId: comment.id })
                        }
                        className="flex w-full items-center gap-2 p-2 text-left text-sm text-red-500 hover:bg-gray-100"
                      >
                        <Trash2 size={14} /> 삭제하기
                      </button>
                    </MoreOptionsMenu>
                  )}
                </div>

                {editingCommentId === comment.id ? (
                  <div className="mt-1 flex flex-col gap-2">
                    <Input
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                    />
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingCommentId(null)}
                      >
                        취소
                      </Button>
                      <Button
                        size="sm"
                        onClick={() =>
                          updateComment({ id: comment.id, content: editValue })
                        }
                      >
                        수정완료
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-sm leading-relaxed text-gray-800">
                      {comment.content}
                    </p>
                    <div className="mt-1 flex items-center gap-3">
                      <span className="text-xs text-gray-400">
                        {new Date(comment.created_at).toLocaleString()}
                      </span>
                      <button
                        onClick={() => setReplyingCommentId(comment.id)}
                        className="text-xs text-gray-500 hover:underline"
                      >
                        답글달기
                      </button>
                    </div>
                  </>
                )}
              </div>
            </article>

            {/* 답글 입력창 */}
            {replyingCommentId === comment.id && (
              <div className="mt-3 ml-11 flex gap-2">
                <Input
                  placeholder="답글 입력..."
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  className="h-9 text-sm"
                />
                <Button
                  size="sm"
                  onClick={() => handleCreateButton(comment.id)}
                >
                  등록
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setReplyingCommentId(null)}
                >
                  취소
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentEditor;
