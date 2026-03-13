'use client';

import { Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button/Button';
import useDeletePost from '../../hooks/useDeletePost';
import { useState } from 'react';

interface CommunityManageButtonProps {
  postId: string;
  categorySlug: string;
  postSlug: string;
  onClose?: () => void;
}

const CommunityManageButton = ({
  postId,
  categorySlug,
  postSlug,
  onClose,
}: CommunityManageButtonProps) => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { mutate: deletePostMutate } = useDeletePost({
    onSuccess: () => {
      toast.success('게시글이 삭제되었습니다.', { position: 'top-center' });
      router.replace(`/community/${categorySlug}`);
      if (onClose) onClose();
    },
  });

  const handleDeletePostButton = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('정말 삭제하시겠습니까?')) {
      deletePostMutate(postId);
    }
  };

  const handleEditPostButton = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/community/${categorySlug}/${postSlug}/edit`);
    if (onClose) onClose();
  };

  return (
    <div
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      className="animate-in fade-in zoom-in-95 flex w-[160px] flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-1.5 shadow-sm duration-200"
    >
      <Button
        onClick={handleEditPostButton}
        variant="ghost"
        className="flex h-11 w-full items-center justify-start gap-3 rounded-xl px-3 text-sm font-bold text-gray-700 transition-colors hover:bg-gray-50"
      >
        <Pencil size={18} className="text-gray-500 group-hover:text-blue-600" />
        수정하기
      </Button>

      <button
        onClick={handleDeletePostButton}
        className="flex w-full items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50"
      >
        <Trash2 size={14} /> 삭제하기
      </button>
    </div>
  );
};

export default CommunityManageButton;
