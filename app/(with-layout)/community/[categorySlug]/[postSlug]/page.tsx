import CommunityDetail from '@/features/community/components/CommunityDetail/CommunityDetail';

interface Props {
  params: Promise<{ categorySlug: string; postSlug: string }>;
}
export const generateMetadata = async ({ params }: Props) => {
  const { postSlug } = await params;
  const decodedSlug = decodeURIComponent(postSlug);
  return {
    title: {
      absolute: `커뮤니티 - ${decodedSlug}`,
    },
  };
};

export default async function PostDetailPage({ params }: Props) {
  const { categorySlug, postSlug } = await params;

  return (
    <div>
      <CommunityDetail
        type="community"
        slug={postSlug}
        categorySlug={categorySlug}
      />
    </div>
  );
}
