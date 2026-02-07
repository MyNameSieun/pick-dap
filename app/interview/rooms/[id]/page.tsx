import InterviewRoom from '@/features/interview/components/InterviewRoom';

type Props = {
  params: {
    id: string;
  };
};

export const generateMetadata = async ({ params }: Props) => {
  const { id } = await params;

  return {
    title: `${id}번`,
    description: `Detail 페이지 : ${id}`,
  };
};

const InterviewRoomsDetailPage = () => {
  return (
    <div className="mx-auto w-full max-w-240">
      <InterviewRoom />
    </div>
  );
};

export default InterviewRoomsDetailPage;
