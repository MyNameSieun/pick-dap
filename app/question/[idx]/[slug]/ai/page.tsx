import QuestionAi from '@/features/question/components/ai/QuestionAi';
import QuestionHeader from '@/features/question/components/QuestionHeader';

interface InterviewAiPageProps {
  params: Promise<{ idx: string; slug: string }>;
}

const InterviewAiPage = async ({ params }: InterviewAiPageProps) => {
  const { idx, slug } = await params;

  return (
    <>
      <QuestionHeader idx={idx} slug={slug} />
      <QuestionAi />
    </>
  );
};

export default InterviewAiPage;
