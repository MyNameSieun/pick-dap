'use client';

import { Button } from '@/components/ui/button/Button';
import { twMerge } from 'tailwind-merge';

const SelectCountBox = ({
  count,
  name,
  buttonName,
  onClick,
  red = false,
}: {
  count: number;
  name?: string;
  buttonName?: string;
  onClick?: () => void;
  red?: boolean;
}) => {
  const defaultOnClick = () => {
    alert('질문이 저장되었습니다.');
  };
  return (
    <>
      <div
        className={twMerge(
          'flex h-15 w-full min-w-128 items-center justify-between rounded-[6px] px-4',
          red ? 'bg-tag-bg-red' : 'bg-main-100',
        )}
      >
        <p
          className={twMerge('b2', red ? 'text-tag-text-red' : 'text-main-500')}
        >
          {count || 0}개 {name || '질문'} 선택됨
        </p>
        <Button
          className={twMerge(
            'h-7.5',
            red
              ? 'bg-tag-text-red hover:bg-tag-text-red/60 active:border-tag-text-red active:text-tag-text-red'
              : '',
          )}
          onClick={onClick || defaultOnClick}
        >
          {buttonName || '선택한 질문 저장'}
        </Button>
      </div>
    </>
  );
};
export default SelectCountBox;
