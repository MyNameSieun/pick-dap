import Contents from '@/features/review/components/ReviewNewPage/Contents';
import BackButton from '../BackButton';
import Line from '../Line';
import { LucideIcon } from 'lucide-react';
import HeaderTitleBox from '@/components/common/HeaderTitleBox';
import { Button } from '@/components/ui/button/Button';
import { ContentsType } from '@/constants/contents';

interface CreateLayoutProps {
  BackButtonLabel: string;
  HeaderTitleBoxObj: {
    title: string;
    content: string;
    icon: LucideIcon;
  };
  children: React.ReactNode;
  contents: ContentsType;
}

const CreateFormLayout = ({
  BackButtonLabel,
  HeaderTitleBoxObj,
  children,
  contents,
}: CreateLayoutProps) => {
  const { title, content, icon } = HeaderTitleBoxObj;
  return (
    <main>
      <header>
        <BackButton label={BackButtonLabel} />
        <HeaderTitleBox title={title} content={content} icon={icon} />

        <Line />
      </header>
      <div className="mt-10 flex gap-10">
        <Contents contents={contents} />
        <div>{children}</div>
      </div>

      <footer>
        <Line />
        <div className="flex justify-end gap-1">
          <Button variant={'white'}>취소</Button>
          <Button>등록하기</Button>
        </div>
      </footer>
    </main>
  );
};

export default CreateFormLayout;
