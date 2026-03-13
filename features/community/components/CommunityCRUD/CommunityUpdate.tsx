'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import CommunityForm from './CommunityForm';
import { useUpdatePost } from '../../hooks/useUpdatePost';
import Loader from '@/components/ui/Loader';
import { UpdatedPost } from '../../services/updatePost';
interface CommunityUpdateProps {
  initialData: UpdatedPost;
}
const CommunityUpdate = ({ initialData }: CommunityUpdateProps) => {
  const router = useRouter();

  const { mutate: updatePost, isPending: isUpdatePending } = useUpdatePost({
    onSuccess: async (data) => {
      if (!data) return;

      toast.success('게시글이 수정되었습니다.', { position: 'top-center' });
      const categorySlug = data.post_category?.slug;

      await router.push(`/community/${categorySlug}/${data.slug}`);
      router.refresh();
    },
    onError: () => {
      toast.error('수정 중 오류가 발생했습니다.');
    },
  });

  if (isUpdatePending) return <Loader />;

  return (
    <CommunityForm
      mode="EDIT"
      initialData={initialData}
      onSubmit={(data) => {
        updatePost({
          id: initialData.id,
          title: data.title,
          content: data.content,
          category_id: data.category_id,
          image_urls: initialData.image_urls || [],
        });
      }}
      isSubmitting={isUpdatePending}
    />
  );
};

export default CommunityUpdate;
