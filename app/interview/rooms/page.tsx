import HeaderTitleBox from '@/components/common/HeaderTitleBox';
import { Button } from '@/components/ui/button/Button';
import { FolderClock } from 'lucide-react';
import InterviewRoomsList from '@/features/interview/components/InterviewRoomsList';
import Tags from '@/components/common/Tags/Tags';

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
          icon={FolderClock}
        />

        <Button variant={'default'}>삭제하기</Button>
      </article>

      <InterviewRoomsList />

      <div className="flex gap-4">
        {/* Green */}
        <Tags size="big">답변 완료</Tags>
        <Tags size="big">합격</Tags>

        {/* Red */}
        <Tags size="big">미완료</Tags>
        <Tags size="big">불합격</Tags>

        {/* Yello */}
        <Tags size="big">진행중</Tags>
        <Tags size="big">답변 대기</Tags>

        {/* Purple */}
        <Tags size="big">기타태그</Tags>
      </div>
    </main>
  );
};
export default InterviewRoomsPage;
