import ReviewMainHeader from '@/features/review/components/ReviewMainHeader';
import ReviewMain from '@/features/review/components/ReviewMain';

const ReviewPage = () => {
  return (
    <div className="flex w-full flex-col pb-20">
      <ReviewMainHeader />
      <ReviewMain />
    </div>
  );
};

export default ReviewPage;
