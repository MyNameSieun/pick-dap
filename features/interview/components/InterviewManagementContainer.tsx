'use client';
import HeaderTitleBox from '@/components/common/HeaderTitleBox';
import { Button } from '@/components/ui/button/Button';
import { FolderClock } from 'lucide-react';
import InterviewRoomsList from '@/features/interview/components/InterviewRoomsList';
import BackButton from '@/components/common/BackButton';
import SelectCountBox from '@/components/common/SelectCountBox/SelectCountBox';
import useDeleteAiInterview from '../hooks/useDeleteAiInterview';
import { useEditActions, useIsEditMode } from '@/store/useEditStore';
import { toast } from 'sonner';

const InterviewManagementContainer = () => {
  const { setEditMode } = useEditActions();
  const isEditMode = useIsEditMode();

  const { mutate: deleteAiInterview } = useDeleteAiInterview({
    onSuccess: () => {
      toast.success('성공적으로 삭제되었습니다.', {
        position: 'top-center',
      });
    },
  });

  const handleDeleteButton = () => {
    setEditMode(!isEditMode);
  };

  return (
    <>
      <BackButton
        label={
          <p>
            <b>면접 연습 메인</b>으로 돌아가기
          </p>
        }
      />

      <section className="flex flex-col">
        <article className="flex justify-between">
          <div className="flex flex-col">
            <HeaderTitleBox
              title={'지난 면접 불러오기'}
              content={'이전에 진행했던 면접을 다시 진행해보세요'}
              icon={FolderClock}
            />
          </div>

          <Button
            variant={isEditMode ? 'white' : 'default'}
            onClick={handleDeleteButton}
          >
            {isEditMode ? <p>취소</p> : <p>삭제하기</p>}
          </Button>
        </article>
        {isEditMode && (
          <SelectCountBox
            onClick={(ids) => deleteAiInterview(ids)}
            state="delete"
            className="mt-[-10px]"
          />
        )}
      </section>

      <InterviewRoomsList />
    </>
  );
};

export default InterviewManagementContainer;
