'use client';
import AiRoomCard from '@/components/common/AiRoomCard';
import { FolderOpen } from 'lucide-react';
import HeaderTitleBox from '@/components/common/HeaderTitleBox';
import { useState } from 'react';
import SelectCountBox from '@/components/common/SelectCountBox/SelectCountBox';

const MypageRoomsPage = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  return (
    <div>
      <HeaderTitleBox
        title="픽봇 AI 면접"
        icon={FolderOpen}
        content="AI 면접관과의 대화 기록을 확인하고 복습하세요"
        buttonOption={{
          text: '기록 선택',
          action: () => {
            setIsEditMode(!isEditMode);
            setSelectedIds([]);
          },
        }}
      />
      {isEditMode && (
        <SelectCountBox
          count={3}
          state="delete"
          setIsEditMode={setIsEditMode}
          setSelectedIds={setSelectedIds}
        />
      )}
      <div className="container-col gap-2.5">
        <AiRoomCard
          isEditMode={isEditMode}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
        />
      </div>
    </div>
  );
};

export default MypageRoomsPage;
