'use client';
import CreateFormLayout from '@/components/common/CreateForm/CreateFormLayout';
import { REVIEW_CONTENTS } from '@/constants/contents';
import BasicInfo from '@/features/review/components/ReviewNewPage/BasicInfo';
import Evaluation from '@/features/review/components/ReviewNewPage/Evaluation';
import Proof from '@/features/review/components/ReviewNewPage/Proof';
import Result from '@/features/review/components/ReviewNewPage/Result';
import Review from '@/features/review/components/ReviewNewPage/Review';
import Tips from '@/features/review/components/ReviewNewPage/Tips';
import { useCreateReview } from '@/features/review/hooks/useCreateReview';
import { useReviewStore } from '@/features/review/store/reviewStore';
import { Pen } from 'lucide-react';
import { useRouter } from 'next/navigation';

const ReviewNewPage = () => {
  const { formData, reset } = useReviewStore();
  const router = useRouter();
  const { mutate: createReview, isPending } = useCreateReview({
    onSuccess: () => {
      reset();
      alert('후기가 성공적으로 등록되었습니다!');
      router.push('/review');
    },
  });

  const handleSubmit = () => {
    // 면접 후기 전용 데이터 가공 로직
    const finalData = {
      ...formData,
      questions: formData.questions.map((q) => ({
        review_content: q.review_content,
      })),
    };
    createReview(finalData);
  };

  return (
    <CreateFormLayout
      onSubmit={handleSubmit}
      isLoading={isPending}
      BackButtonLabel="목록으로 돌아가기"
      HeaderTitleBoxObj={{
        title: '면접 후기 작성',
        content: '실제 면접 경험을 공유해주세요',
        icon: Pen,
      }}
      contents={REVIEW_CONTENTS}
    >
      <BasicInfo />
      <Evaluation />
      <Review />
      <Tips />
      <Result />
      <Proof />
    </CreateFormLayout>
  );
};
export default ReviewNewPage;
