'use client';

import Contents from '@/components/common/CreateForm/Contents';
import BackButton from '../BackButton';
import Line from '../Line';
import { Loader, LucideIcon } from 'lucide-react';
import HeaderTitleBox from '@/components/common/HeaderTitleBox';
import { Button } from '@/components/ui/button/Button';
import { ContentsType } from '@/types/contents';
import { useReviewStore } from '@/features/review/store/reviewStore';
import { useCreateReview } from '@/features/review/hooks/useCreateReview';
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
}

const CreateFormLayout = ({
  BackButtonLabel,
  HeaderTitleBoxObj,
  children,
  contents,
}: CreateLayoutProps) => {
  const { title, content, icon } = HeaderTitleBoxObj;

  const { formData, reset } = useReviewStore();

  const router = useRouter();
  const { mutate: createReviewMutate, isPending: isCreateReviewPending } =
    useCreateReview({
      onSuccess: () => {
        reset();
        alert('후기가 성공적으로 등록되었습니다!');
        router.push('/review');
      },
    });
  if (isCreateReviewPending) return <Loader />;

  const handleCreateReviewButton = () => {
    const finalData = {
      ...formData,
      questions: formData.questions.map((q) => ({
        review_content: q.review_content,
      })),
    };

    createReviewMutate(finalData);
  };
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
          <Button disabled={isCreateReviewPending} variant={'white'}>
            취소
          </Button>
          <Button
            disabled={isCreateReviewPending}
            onClick={handleCreateReviewButton}
          >
            등록하기
          </Button>
        </div>
      </footer>
    </main>
  );
};

export default CreateFormLayout;
