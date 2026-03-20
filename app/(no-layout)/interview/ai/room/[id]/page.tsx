import InterviewRoom from '@/features/interview/components/InterviewRoom';

interface Props {
  params: Promise<{ id: string }>;
}
export const generateMetadata = async () => {
  return {
    title: `AI 면접 연습`,
    default: 'AI 면접 연습',
  };
};

const InterviewRoomsDetailPage = async ({ params }: Props) => {
  const { id } = await params;

  return (
    <div>
      <InterviewRoom interviewId={id} />
    </div>
  );
};

export default InterviewRoomsDetailPage;
