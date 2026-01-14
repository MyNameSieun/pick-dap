import BackButton from '@/components/common/BackButton';
import HeaderTitleBox from '@/components/common/HeaderTitleBox';
import Line from '@/components/common/Line';
import { Button } from '@/components/ui/button/Button';

import BasicInfo from '@/features/review/components/ReviewNewPage/BasicInfo';
import Contents from '@/features/review/components/ReviewNewPage/Contents';
import Evaluation from '@/features/review/components/ReviewNewPage/Evaluation';
import Proof from '@/features/review/components/ReviewNewPage/Proof';
import Result from '@/features/review/components/ReviewNewPage/Result';
import Review from '@/features/review/components/ReviewNewPage/Review';
import Tips from '@/features/review/components/ReviewNewPage/Tips';
import { Pen } from 'lucide-react';

const ReviewNewPage = () => {
  return (
    <main>
      <header>
        <BackButton label="목록으로 돌아가기" />

        <HeaderTitleBox
          title="면접 후기 작성"
          content="실제 면접 경험을 공유해주세요"
          icon={Pen}
        />

        <Line />
      </header>

      <div className="mt-10 flex gap-10">
        <Contents />

        <div>
          <BasicInfo />
          <Evaluation />
          <Review />
          <Tips />
          <Result />
          <Proof />
        </div>
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

export default ReviewNewPage;
