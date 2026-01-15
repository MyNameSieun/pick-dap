'use client';
import HeaderTitleBox from '@/components/common/HeaderTitleBox';
import SelectCountBox from '@/components/common/SelectCountBox/SelectCountBox';
import { LucideIcon, SquarePen } from 'lucide-react';
import { useState } from 'react';

type actionButtonName = '선택한 항목 삭제' | '내 리스트에 추가';

interface ListSelectionHeaderProps {
  title: string;
  content: string;
  icon: LucideIcon;
  onAction: () => void;
  selectedCount: number;
  actionButtonName: actionButtonName;
  className?: string;
}

const ListSelectionHeader = ({
  title,
  content,
  icon,
  onAction,
  selectedCount,
  actionButtonName,
  className,
}: ListSelectionHeaderProps) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <div className={`mb-8 justify-between ${className} `}>
        <HeaderTitleBox
          icon={icon}
          title={title}
          content={content}
          buttonOption={{
            text: isActive
              ? buttonTextMap[actionButtonName].active
              : buttonTextMap[actionButtonName].inactive,
            action: () => setIsActive(!isActive),
            icon: SquarePen,
          }}
        />
      </div>
    </>
  );
};

export default ListSelectionHeader;
