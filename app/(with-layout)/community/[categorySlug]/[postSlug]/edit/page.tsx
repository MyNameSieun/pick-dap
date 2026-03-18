import CommunityUpdate from '@/features/community/components/CommunityCRUD/CommunityUpdate';
import { fetchPostDetail } from '@/features/community/services/fetchPostsData';
import { notFound } from 'next/navigation';
interface Props {
  params: Promise<{
    categorySlug: string;
    postSlug: string;
  }>;
}
const CommunityPostEditDetailPage = async ({ params }: Props) => {
  const { categorySlug, postSlug } = await params;

  const post = await fetchPostDetail(categorySlug, postSlug);
  if (!post) notFound();

  return (
    <div>
      <CommunityUpdate initialData={post} />
    </div>
  );
};

export default CommunityPostEditDetailPage;
