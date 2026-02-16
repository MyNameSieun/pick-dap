import { Button } from '@/components/ui/button/Button';
import { cn } from '@/lib/utils';
import { Heart } from 'lucide-react';
import { toast } from 'sonner';
import { useToggleAnswerLike } from '../../hooks/answer/useToggleAnswerLike';

interface LikeAnswerButtonProps {
  answerId: string;
  answerLikeCount: number;
  isLiked: boolean;
  questionId: string;
}

export const LikeAnswerButton = ({
  answerId,
  answerLikeCount,
  isLiked,
  questionId,
}: LikeAnswerButtonProps) => {
  const { mutate: toggleAnswerLikeMutation, isPending } = useToggleAnswerLike({
    onError: () => {
      toast.error('좋아요 요청에 실패했습니다', { position: 'top-center' });
    },
  });
  const handleLikeClick = () => {
    if (isPending) return;

    toggleAnswerLikeMutation({ answerId, questionId });
  };
  return (
    <Button
      onClick={handleLikeClick}
      variant="none"
      className={cn(
        'group/like flex h-10 gap-2 rounded-full border-gray-200 text-gray-900 transition-all active:scale-95',
        isLiked
          ? 'border-red-100 bg-red-50 text-red-600 hover:bg-red-100'
          : 'hover:border-gray-300',
      )}
    >
      <Heart
        size={16}
        className={cn(
          'transition-colors',
          isLiked
            ? 'fill-red-500 text-red-500'
            : 'text-gray-400 group-hover/like:text-red-400',
        )}
      />

      <span className="font-semibold">{answerLikeCount}</span>
    </Button>
  );
};
