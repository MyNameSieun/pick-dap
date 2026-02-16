import { Heart } from 'lucide-react';
import { CommentEntity } from '../../services/comment/fetchComments';
import { cn } from '@/lib/utils';
import { useToggleCommentLike } from '../../hooks/comment/useToggleCommentLike';

interface LikeCommentButtonProps {
  comment: CommentEntity;
  answerId: string;
}

const LikeCommentButton = ({ comment, answerId }: LikeCommentButtonProps) => {
  const { mutate: commentLikeMutate, isPending: isCommentLikePending } =
    useToggleCommentLike();

  const handleLikeClick = () => {
    commentLikeMutate({ commentId: comment.id, answerId });
  };
  return (
    <button
      onClick={handleLikeClick}
      className="c1 flex items-center gap-1 text-gray-500"
    >
      <Heart
        fill={comment.like_count > 0 ? 'currentColor' : 'none'}
        className={cn(
          'cursor-pointer',
          comment.like_count > 0 ? 'text-red-500' : 'text-gray-400',
        )}
        size={14}
      />
      {comment.like_count ?? 0}
    </button>
  );
};

export default LikeCommentButton;
