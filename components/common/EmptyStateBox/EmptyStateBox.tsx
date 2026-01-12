'use client';

import { Button } from '@/components/ui/button/Button';
import { FolderOpen, LucideIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

const EmptyStateBox = ({
  Icon = FolderOpen,
  title,
  description,
  buttonName,
  onClick,
}: {
  Icon?: LucideIcon;
  title: string;
  description: string;
  buttonName: string;
  onClick?: () => void;
}) => {
  const router = useRouter();
  const defaultOnClick = () => {
    router.back();
  };

  return (
    <div className="flex h-70 flex-col items-center justify-center gap-5 border border-dashed border-gray-400 bg-white">
      <div className="h-16 w-16 items-center justify-center">
        <Icon className="text-icon-default fill-gray-300" size={64} />
      </div>
      <div className="text-center">
        <h5 className="text-gray-1000">{title || '프로젝트를 추가해보세요'}</h5>
        <div className="c1 text-gray-700">
          {description ||
            '프로젝트 정보를 등록하면 AI가 더 정확한 면접 질문을 생성해드립니다!'}
        </div>
      </div>
      <Button
        variant="white"
        className="h-9.5 text-black"
        onClick={onClick || defaultOnClick}
      >
        {buttonName || '프로젝트 추가하기'}
      </Button>
    </div>
  );
};

export default EmptyStateBox;
