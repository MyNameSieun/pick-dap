import InterviewMain from '@/features/interview/components/InterviewMain';

export const metadata = {
  title: '면접 연습',
};

const InterviewPage = () => {
  return (
    <div className="mx-auto flex w-fit max-w-168 flex-col items-center gap-4 pt-8">
      <InterviewMain />
    </div>
  );
};

export default InterviewPage;
