import CommunityDetail from '@/features/community/components/CommunityDetail/CommunityDetail';

interface Props {
  params: Promise<{ categorySlug: string; postSlug: string }>;
}

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
