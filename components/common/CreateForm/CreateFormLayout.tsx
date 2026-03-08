'use client';

import Contents from '@/components/common/CreateForm/Contents';
import BackButton from '../BackButton';
import Line from '../Line';
import { LucideIcon } from 'lucide-react';
import HeaderTitleBox from '@/components/common/HeaderTitleBox';
import { Button } from '@/components/ui/button/Button';
import { ContentsType } from '@/types/contents';
import Loader from '@/components/ui/Loader';

interface CreateLayoutProps {
  BackButtonLabel: string;
  HeaderTitleBoxObj: {
    title: string;
    content: string;
    icon: LucideIcon;
  };
  children: React.ReactNode;
  contents: ContentsType;
  // 공통화를 위해 추가된 props
  onSubmit: () => void;
  isLoading?: boolean;
}

const CreateFormLayout = ({
  BackButtonLabel,
  HeaderTitleBoxObj,
  children,
  contents,
  onSubmit,
  isLoading = false,
}: CreateLayoutProps) => {
  const { title, content, icon } = HeaderTitleBoxObj;

  if (isLoading) return <Loader />;

  return (
    <main>
      <header>
        <BackButton label={BackButtonLabel} />
        <HeaderTitleBox title={title} content={content} icon={icon} />
        <Line />
      </header>

      <div className="mt-10 flex gap-10">
        <Contents contents={contents} />
        <div className="flex flex-1 flex-col">{children}</div>
      </div>

      <footer>
        <Line />
        <div className="flex justify-end gap-1">
          <Button disabled={isLoading} variant={'white'}>
            취소
          </Button>
          <Button disabled={isLoading} onClick={onSubmit}>
            등록하기
          </Button>
        </div>
      </footer>
    </main>
  );
};

export default CreateFormLayout;
