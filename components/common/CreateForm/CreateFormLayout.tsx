'use client';

import Contents from '@/components/common/CreateForm/Contents';
import BackButton from '../BackButton';
import Line from '../Line';
import { LucideIcon } from 'lucide-react';
import HeaderTitleBox from '@/components/common/HeaderTitleBox';
import { Button } from '@/components/ui/button/Button';
import { ContentsType } from '@/types/contents';
import Loader from '@/components/ui/Loader';
import { useRouter } from 'next/navigation';

interface CreateLayoutProps {
  BackButtonLabel: string;
  HeaderTitleBoxObj: {
    title: string;
    content: string;
    icon: LucideIcon;
  };
  children: React.ReactNode;
  contents: ContentsType;
  onSubmit: () => void;
  isLoading?: boolean;
  type: 'EDIT' | 'CREATE';
  isSubmittable?: boolean;
}

const CreateFormLayout = ({
  BackButtonLabel,
  HeaderTitleBoxObj,
  children,
  contents,
  onSubmit,
  isLoading = false,
  type,
  isSubmittable,
}: CreateLayoutProps) => {
  const { title, content, icon } = HeaderTitleBoxObj;
  const router = useRouter();

  if (isLoading) return <Loader />;

  return (
    <main className="w-max-7xl">
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
          <Button
            onClick={() => router.back()}
            disabled={isLoading}
            variant={'white'}
          >
            취소
          </Button>
          <Button disabled={isLoading || !isSubmittable} onClick={onSubmit}>
            {type === 'CREATE' ? '등록하기' : '수정완료'}
          </Button>
        </div>
      </footer>
    </main>
  );
};

export default CreateFormLayout;
