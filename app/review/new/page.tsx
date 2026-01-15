import CreateFormLayout from '@/components/common/CreateForm/CreateFormLayout';
import BasicInfo from '@/features/review/components/ReviewNewPage/BasicInfo';
import Evaluation from '@/features/review/components/ReviewNewPage/Evaluation';
import Proof from '@/features/review/components/ReviewNewPage/Proof';
import Result from '@/features/review/components/ReviewNewPage/Result';
import Review from '@/features/review/components/ReviewNewPage/Review';
import Tips from '@/features/review/components/ReviewNewPage/Tips';
import { REVIEW_CONTENTS } from '@/types/contents';
import { Pen } from 'lucide-react';

const ReviewNewPage = () => {
  return (
    <CreateFormLayout
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
