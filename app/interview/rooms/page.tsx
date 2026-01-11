import InterviewRooms from '@/features/interview/components/InterViewRooms';

export const metadata = {
  title: '지난 면접 불러오기',
};

const InterviewRoomsPage = () => {
  return (
    <>
      <div className="mx-auto flex w-fit max-w-200 flex-col items-center gap-6 pt-8">
        <InterviewRooms />
      </div>
    </>
  );
};
export default InterviewRoomsPage;
