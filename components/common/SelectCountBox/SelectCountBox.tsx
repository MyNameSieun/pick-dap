'use client';

import { Button } from '@/components/ui/button/Button';

const SelectCountBox = ({
  count,
  name,
  buttonName,
  onClick,
}: {
  count: number;
  name?: string;
  buttonName?: string;
  onClick?: () => void;
}) => {
  const defaultOnClick = () => {
    alert('질문이 저장되었습니다.');
  };
  return (
    <>
      <div className="bg-main-100 flex h-15 w-full min-w-128 items-center justify-between rounded-[6px] px-4">
        <p className="b2 text-main-500">
          {count || 0}개 {name || '질문'} 선택됨
        </p>
        <Button className="h-7.5" onClick={onClick || defaultOnClick}>
          {buttonName || '선택한 질문 저장'}
        </Button>
      </div>
    </>
  );
};
export default SelectCountBox;
