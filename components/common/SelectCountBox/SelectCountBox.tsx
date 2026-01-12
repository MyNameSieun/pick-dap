'use client';

import { Button } from '@/components/ui/button/Button';
import { cn } from '@/lib/utils';
import { SetStateAction } from 'react';
import { toast } from 'sonner';

type State = 'save' | 'delete';

interface SelectCountBoxProps {
  count: number;
  name?: string;
  onClick?: () => void;
  state: State;
  setIsEditMode: React.Dispatch<SetStateAction<boolean>>;
  setSelectedIds: React.Dispatch<SetStateAction<number[]>>;
}

const SelectCountBox = ({
  count,
  name,
  state,
  setIsEditMode,
  setSelectedIds,
}: SelectCountBoxProps) => {
  const isSave = state === 'save';

  const onClickSaveButtonHandler = () => {
    toast.success('마이페이지에 저장되었습니다!', { position: 'top-center' });
    setIsEditMode(false);
    setSelectedIds([]);
  };

  const onClickDeleteButtonHandler = () => {
    toast.success('삭제되었습니다.', { position: 'top-center' });
    setIsEditMode(false);
    setSelectedIds([]);
  };
  return (
    <>
      <div
        className={cn(
          'flex h-15 w-full min-w-128 items-center justify-between rounded-[6px] px-4',
          isSave ? 'bg-main-100' : 'bg-tag-bg-red',
        )}
      >
        <p className={cn('b2', isSave ? 'text-main-500' : 'text-tag-text-red')}>
          {count || 0}개 {name || '질문'} 선택됨
        </p>
        <Button
          variant={isSave ? 'default' : 'red'}
          className="h-7.5"
          onClick={
            isSave ? onClickSaveButtonHandler : onClickDeleteButtonHandler
          }
        >
          {isSave ? '선택한 질문 저장' : '선택한 질문 삭제'}
        </Button>
      </div>
    </>
  );
};
export default SelectCountBox;
