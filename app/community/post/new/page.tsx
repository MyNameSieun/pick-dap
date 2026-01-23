import CommunityCreate from '@/features/community/components/CommunityCRUD/CommunityCreate';

const CommunityPagePostNewPage = () => {
  return (
    <div className="mx-auto mt-8 flex w-full max-w-214 flex-col items-start gap-4">
      <CommunityCreate />
    </div>
  );
};

export default CommunityPagePostNewPage;
