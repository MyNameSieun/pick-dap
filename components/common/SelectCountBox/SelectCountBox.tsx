'use client';

import { Button } from '@/components/ui/button/Button';
import clsx from 'clsx';

type state = 'save' | 'delete';

interface SelectCountBoxProps {
  count: number;
  name?: string;
  onClick?: () => void;
  state: state;
}

const SelectCountBox = ({
  count,
  name,
  onClick,
  state,
}: SelectCountBoxProps) => {
  const defaultOnClick = () => {
    alert('질문이 저장되었습니다.');
  };
  return (
    <>
      <div
        className={clsx(
          'flex h-15 w-full min-w-128 items-center justify-between rounded-[6px] px-4',
          state === 'save' ? 'bg-main-100' : 'bg-tag-bg-red',
        )}
      >
        <p
          className={clsx(
            'b2',
            state === 'save' ? 'text-main-500' : 'text-tag-text-red',
          )}
        >
          {count || 0}개 {name || '질문'} 선택됨
        </p>
        <Button
          variant={state === 'save' ? 'default' : 'red'}
          className="h-7.5"
          onClick={onClick || defaultOnClick}
        >
          {state === 'save' ? <p>선택한 질문 저장</p> : <p>선택한 질문 삭제</p>}
        </Button>
      </div>
    </>
  );
};
export default SelectCountBox;
