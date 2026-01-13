import CommunityMain from '@/features/community/components/CommunityMain';
import CommunitySub from '@/features/community/components/CommunitySub';

interface Props {
  params: Promise<{ categoryId: string }>;
}

export const generateMetadata = async ({ params }: Props) => {
  const { categoryId } = await params;
  return {
    title: `커뮤니티 - ${categoryId}`,
  };
};

export default async function CommunityCategoryDetailPage({ params }: Props) {
  const { categoryId } = await params;
  return (
    <div className="mx-auto mt-8 flex w-fit max-w-214 flex-col items-start gap-7.5">
      <CommunityMain />
      <CommunitySub categoryId={categoryId} />
    </div>
  );
}
