import InterviewAiMain from '@/features/interview/components/InterviewAiMain';

export const metadata = {
  title: 'AI 면접 질문 생성',
};

const InterviewAiPage = () => {
  return (
    <div className="mx-auto w-full max-w-285">
      <InterviewAiMain />
    </div>
  );
};

export default InterviewAiPage;
