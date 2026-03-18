'use client';

import { Button } from '@/components/ui/button/Button';
import { cn } from '@/lib/utils';
import { useEditActions, useSelectedIds } from '@/store/useEditStore';
import { toast } from 'sonner';

interface SelectCountBoxProps {
  onClick?: (ids: string[]) => void;
  state: 'save' | 'delete';
  className?: string;
}

const SelectCountBox = ({ onClick, state, className }: SelectCountBoxProps) => {
  const selectedIds = useSelectedIds();
  const { resetSelectedIds, setEditMode } = useEditActions();

  const count = selectedIds.length;
  const isSave = state === 'save';

  const handleAction = () => {
    if (count === 0) {
      toast.error('선택된 항목이 없습니다.');
      return;
    }

    if (onClick) {
      onClick(selectedIds);
      resetSelectedIds();
      setEditMode(false);
    }
  };

  return (
    <div
      className={cn(
        'animate-in fade-in slide-in-from-top-2 mb-3 flex h-15 w-full items-center justify-between rounded-[6px] px-4',
        isSave ? 'bg-main-100' : 'bg-red-50',
        className,
      )}
    >
      <p
        className={cn(
          'b2 font-bold',
          isSave ? 'text-main-500' : 'text-red-600',
        )}
      >
        {count}개의 면접 선택됨
      </p>
      <Button
        variant={isSave ? 'default' : 'red'}
        size="sm"
        disabled={count === 0}
        onClick={handleAction}
      >
        {isSave ? '선택한 면접 저장' : '선택한 면접 삭제'}
      </Button>
    </div>
  );
};

export default SelectCountBox;
