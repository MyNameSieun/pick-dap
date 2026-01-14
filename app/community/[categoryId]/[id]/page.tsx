import CommunityDetail from '@/features/community/components/CommunityDetail/CommunityDetail';

interface Props {
  params: Promise<{ categoryId: string; id: string }>;
}

export const generateMetadata = async ({ params }: Props) => {
  const { categoryId, id } = await params;
  return {
    title: `커뮤니티 ${categoryId}-${id}`,
  };
};

const CommunityCategoryDetailIdPage = () => {
  return (
    <div className="mx-auto mt-8 flex w-full max-w-250 flex-col items-start gap-1">
      <CommunityDetail />
    </div>
  );
};

export default CommunityCategoryDetailIdPage;
