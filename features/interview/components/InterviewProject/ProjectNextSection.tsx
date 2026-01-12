'use client';

import { twMerge } from 'tailwind-merge';
import { Button } from '@/components/ui/button/Button';
import AiRoomCard from '@/components/common/AiRoomCard';
import { useState } from 'react';

const ProjectNextSection = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  const handleChooseButton = () => {
    setIsEditMode(!isEditMode);
  };
  return (
    <>
      <div className={twMerge('container-col', 'w-3/5 gap-8 p-9')}>
        <div className="flex items-start justify-between">
          <h5 className="h5 text-black">생성된 질문 (10개)</h5>
          <Button
            variant="white"
            className="h-9.5 font-bold"
            onClick={handleChooseButton}
          >
            질문 담기
          </Button>
        </div>
        <div className="flex flex-col gap-3">
          <AiRoomCard isEditMode={isEditMode} setIsEditMode={setIsEditMode} />
        </div>
      </div>
    </>
  );
};
export default ProjectNextSection;
