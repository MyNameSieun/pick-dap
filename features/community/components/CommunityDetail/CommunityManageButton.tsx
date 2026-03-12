import { Button } from '@/components/ui/button/Button';
import { Pencil, Trash } from 'lucide-react';
import useDeletePost from '../../hooks/useDeletePost';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface CommunityManageButtonProps {
  postId: string;
  categorySlug: string;
}

const CommunityManageButton = ({
  postId,
  categorySlug,
}: CommunityManageButtonProps) => {
  const router = useRouter();

  // 게시글 삭제
  const { mutate: deletePostMutate } = useDeletePost({
    onSuccess: () => {
      toast.success('게시글이 삭제되었습니다.', { position: 'top-center' });
      router.replace(`/community/${categorySlug}`);
    },
  });

  const handleDeletePostButton = () => {
    const confirm = window.confirm('정말 삭제하시겠습니까?');
    if (confirm) {
      deletePostMutate(postId);
    }
  };
  return (
    <div className="bodrer-gray-100 flex w-fit flex-col border bg-gray-100 shadow-md">
      <Button className="h-10 w-22 gap-3 font-semibold" variant="ghost">
        <Pencil />
        수정
      </Button>
      <Button
        onClick={handleDeletePostButton}
        className="h-10 w-22 gap-3 font-semibold"
        variant="ghost"
      >
        <Trash />
        삭제
      </Button>
    </div>
  );
};
export default CommunityManageButton;
