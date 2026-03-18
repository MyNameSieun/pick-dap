import CommunityMain from '@/features/community/components/CommunityMain';
import CommunitySub from '@/features/community/components/CommunitySub';

interface Props {
  params: Promise<{ categorySlug: string }>;
}

export default async function CategoryListPage({ params }: Props) {
  const { categorySlug } = await params;

  return (
    <div className="flex flex-col gap-7.5">
      <CommunityMain />
      <CommunitySub categorySlug={categorySlug} />
    </div>
  );
}
