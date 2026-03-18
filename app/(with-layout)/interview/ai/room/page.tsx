import InterviewManagementContainer from '@/features/interview/components/InterviewManagementContainer';

export const metadata = {
  title: '지난 면접 불러오기',
};

const InterviewRoomsPage = () => {
  return (
    <main className="flex flex-col gap-7">
      <InterviewManagementContainer />
    </main>
  );
};
export default InterviewRoomsPage;
