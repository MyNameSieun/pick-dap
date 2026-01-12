import InterviewRoom from '@/features/interview/components/InterviewRoom';

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  return {
    title: `면접 ${(await params).id}`,
  };
};

const InterviewRoomsDetailPage = () => {
  return (
    <div className="mx-auto w-full max-w-200">
      <InterviewRoom />
    </div>
  );
};

export default InterviewRoomsDetailPage;
