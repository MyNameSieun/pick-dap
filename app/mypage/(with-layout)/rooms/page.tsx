'use client';
import AiRoomCard from '@/components/common/AiRoomCard';
import { FolderOpen } from 'lucide-react';
import HeaderTitleBox from '@/components/common/HeaderTitleBox';
import SelectCountBox from '@/components/common/SelectCountBox/SelectCountBox';
import {
  useEditActions,
  useIsEditMode,
  useSelectedIds,
} from '@/store/useEditStore';

const MypageRoomsPage = () => {
  const isEditMode = useIsEditMode();
  const selectedIds = useSelectedIds();
  const { setEditMode } = useEditActions();

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
        <SelectCountBox count={selectedIds.length} state="delete" />
      )}
      <div className="container-col gap-2.5">
        <AiRoomCard />
      </div>
    </div>
  );
};

export default MypageRoomsPage;
