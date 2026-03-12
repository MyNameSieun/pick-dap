import CommunityDetail from '@/features/community/components/CommunityDetail/CommunityDetail';

interface Props {
  params: Promise<{ categorySlug: string; postSlug: string }>;
}

export default async function PostDetailPage({ params }: Props) {
  const { categorySlug, postSlug } = await params;

  return (
    <div className="mx-auto mt-8 flex max-w-250 flex-col items-start gap-1">
      <CommunityDetail slug={postSlug} categorySlug={categorySlug} />
    </div>
  );
}
