'use client';

import { Button } from '@/components/ui/button/Button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type State = 'save' | 'delete';

interface SelectCountBoxProps {
  count: number;
  name?: string;
  onClick?: () => void;
  state: State;
}

const SelectCountBox = ({ count, name, state }: SelectCountBoxProps) => {
  const isSave = state === 'save';

  const onClickSaveButtonHandler = () => {
    toast.success('마이페이지에 저장되었습니다!', { position: 'top-center' });
  };

  const onClickDeleteButtonHandler = () => {
    toast.success('삭제되었습니다.', { position: 'top-center' });
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
          {isSave ? <p>선택한 질문 저장</p> : <p>선택한 질문 삭제</p>}
        </Button>
      </div>
    </>
  );
};
export default SelectCountBox;
