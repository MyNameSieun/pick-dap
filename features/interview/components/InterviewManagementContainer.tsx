'use client';
import HeaderTitleBox from '@/components/common/HeaderTitleBox';
import { Button } from '@/components/ui/button/Button';
import { FolderClock } from 'lucide-react';
import InterviewRoomsList from '@/features/interview/components/InterviewRoomsList';
import { useState } from 'react';

const InterviewManagementContainer = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  const handleDeleteButton = () => {
    setIsEditMode(!isEditMode);
  };

  return (
    <>
      <article className="flex justify-between">
        <HeaderTitleBox
          title={'지난 면접 불러오기'}
          content={'이전에 진행했던 면접을 다시 진행해보세요'}
          icon={FolderClock}
        />

        <Button variant={'default'} onClick={handleDeleteButton}>
          {isEditMode ? <p>삭제 취소</p> : <p>삭제하기</p>}
        </Button>
      </article>
      <InterviewRoomsList
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
      />
    </>
  );
};

export default InterviewManagementContainer;
