'use client';
import AiRoomCard from '@/components/common/AiRoomCard';
import { FolderOpen } from 'lucide-react';
import HeaderTitleBox from '@/components/common/HeaderTitleBox';
import SelectCountBox from '@/components/common/SelectCountBox/SelectCountBox';
import { useEditActions, useIsEditMode } from '@/store/useEditStore';
import useDeleteAiInterview from '@/features/interview/hooks/useDeleteAiInterview';

const MypageRoomsPage = () => {
  const isEditMode = useIsEditMode();
  const { setEditMode } = useEditActions();
  const { mutate: deleteInterviews } = useDeleteAiInterview();

  const handleDeleteInterview = (ids: string[]) => {
    if (!confirm(`정말 ${ids.length}개의 기록을 삭제하시겠습니까?`)) return;
    deleteInterviews(ids);
  };
  return (
    <div>
      <HeaderTitleBox
        title="픽봇 AI 면접"
        icon={FolderOpen}
        content="AI 면접관과의 대화 기록을 확인하고 복습하세요"
        buttonOption={{
          text: '기록 선택',
          action: () => setEditMode(!isEditMode),
        }}
      />
      {isEditMode && (
        <SelectCountBox state="delete" onClick={handleDeleteInterview} />
      )}
      <div className="container-col gap-2.5">
        <AiRoomCard />
      </div>
    </div>
  );
};

export default MypageRoomsPage;
