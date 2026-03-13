'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useCreatePost } from '../../hooks/useCreatePost';
import CommunityForm from './CommunityForm';

const CommunityCreate = () => {
  const router = useRouter();

  const { mutate: createPost, isPending: isPostPending } = useCreatePost({
    onSuccess: (data) => {
      toast.success('게시글이 등록되었습니다.', { position: 'top-center' });
      router.push(`/community/${data?.post_category.slug}/${data?.slug}`);
    },
    onError: () => {
      toast.error('게시글 등록에 실패했습니다.');
    },
  });

  return (
    <CommunityForm
      mode="CREATE"
      onSubmit={(data) => {
        createPost({
          ...data,
          image_urls: [],
        });
      }}
      isSubmitting={isPostPending}
    />
  );
};

export default CommunityCreate;
