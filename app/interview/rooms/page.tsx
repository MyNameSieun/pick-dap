import HeaderTitleBox from '@/components/common/HeaderTitleBox';
import { Button } from '@/components/ui/button/Button';
import AiRoomCard from '@/components/common/AiRoomCard';
import { Upload } from 'lucide-react';
import InterviewRoomsList from '@/features/interview/components/InterviewRoomsList';

export const metadata = {
  title: '지난 면접 불러오기',
};

const InterviewRoomsPage = () => {
  return (
    <main className="flex flex-col gap-7">
      <article className="flex justify-between">
        <HeaderTitleBox
          title={'지난 면접 불러오기'}
          content={'이전에 진행했던 면접을 다시 진행해보세요'}
          icon={Upload}
        />

        <Button variant={'default'}>삭제하기</Button>
      </article>

      <InterviewRoomsList />
    </main>
  );
};
export default InterviewRoomsPage;
