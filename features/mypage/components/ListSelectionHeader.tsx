'use client';
import HeaderTitleBox from '@/components/common/HeaderTitleBox';
import SelectCountBox from '@/components/common/SelectCountBox/SelectCountBox';
import { Button } from '@/components/ui/button/Button';
import { LucideIcon } from 'lucide-react';
import { useState } from 'react';

type actionButtonName = '선택한 항목 삭제' | '내 리스트에 추가';

interface ListSelectionHeaderProps {
  title: string;
  content: string;
  icon: LucideIcon;
  onAction: () => void;
  selectedCount: number;
  actionButtonName: actionButtonName;
}

const buttonTextMap = {
  '내 리스트에 추가': {
    active: '선택 취소',
    inactive: '기록 선택',
    state: 'save',
  },
  '선택한 항목 삭제': {
    active: '선택 취소',
    inactive: '게시글 선택',
    state: 'delete',
  },
};

const ListSelectionHeader = ({
  title,
  content,
  icon,
  onAction,
  selectedCount,
  actionButtonName,
}: ListSelectionHeaderProps) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <div className="container-row mb-3 justify-between">
        <HeaderTitleBox icon={icon} title={title} content={content} />

        <Button
          className="mt-1"
          variant={'default'}
          onClick={() => setIsActive(!isActive)}
        >
          {isActive
            ? buttonTextMap[actionButtonName].active
            : buttonTextMap[actionButtonName].inactive}
        </Button>
      </div>

      {isActive ? (
        <div className="mb-4">
          <SelectCountBox
            count={selectedCount}
            onClick={onAction}
            state={buttonTextMap[actionButtonName].state as 'save' | 'delete'}
            className="min-w-full"
          />
        </div>
      ) : null}
    </>
  );
};

export default ListSelectionHeader;
