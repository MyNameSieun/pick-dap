import QuestionHeader from '../../../features/question/components/QuestionHeader';
import BackButton from '@/components/common/BackButton';
import QuestionDetail from '@/features/question/components/QuestionDetail';

const QuestionPage = () => {
  return (
    <div className="flex flex-col">
      <BackButton label={'뒤로가기'} />
      <QuestionHeader />
      <QuestionDetail />
    </div>
  );
};

export default QuestionPage;
