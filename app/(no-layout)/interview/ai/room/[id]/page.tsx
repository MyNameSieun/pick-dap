import InterviewRoom from '@/features/interview/components/InterviewRoom';

interface Props {
  params: Promise<{ id: string }>;
}

const InterviewRoomsDetailPage = async ({ params }: Props) => {
  const { id } = await params;

  return (
    <div>
      <InterviewRoom interviewId={id} />
    </div>
  );
};

export default InterviewRoomsDetailPage;
