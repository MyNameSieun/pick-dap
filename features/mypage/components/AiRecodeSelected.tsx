'use client';
import HeaderTitleBox from '@/components/common/HeaderTitleBox';
import SelectCountBox from '@/components/common/SelectCountBox/SelectCountBox';
import { Button } from '@/components/ui/button/Button';
import { FolderOpen } from 'lucide-react';
import { useState } from 'react';

const AiRecodeSelected = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <div className="container-row mb-3 justify-between">
        <HeaderTitleBox
          icon={FolderOpen}
          title={'픽봇 AI 면접'}
          content={'AI 면접관과의 대화 기록을 확인하고 복습하세요'}
        />

        <Button
          className="mt-1"
          variant={'default'}
          onClick={() => setIsActive(!isActive)}
        >
          {!isActive ? '기록 선택' : '삭제 취소'}
        </Button>
      </div>

      {isActive ? (
        <div className="mb-4.5">
          <SelectCountBox count={2} buttonName="선택한 질문 삭제" />
        </div>
      ) : null}
    </>
  );
};

export default AiRecodeSelected;
