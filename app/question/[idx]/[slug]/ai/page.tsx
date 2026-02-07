import QuestionAi from '@/features/question/components/QuestionAi';
import BackButton from '@/components/common/BackButton';
import QuestionHeader from '@/features/question/components/QuestionHeader';

interface InterviewAiPageProps {
  params: Promise<{ idx: string; slug: string }>;
}

const InterviewAiPage = async ({ params }: InterviewAiPageProps) => {
  const { idx, slug } = await params;

  return (
    <>
      <BackButton label={'질문으로 돌아가기'} />
      <QuestionHeader idx={idx} slug={slug} />
      <QuestionAi />
    </>
  );
};

export default InterviewAiPage;
