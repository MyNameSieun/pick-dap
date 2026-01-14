import TagSearchBar from '@/components/TagSearchBar';
import QuestionCardList from '../../features/question/components/QuestionCardList';
import Paging from '@/components/common/Paging';

const QuestionPage = () => {
  return (
    <div className="mx-auto w-full">
      <TagSearchBar />
      <QuestionCardList />
      <Paging />
    </div>
  );
};

export default QuestionPage;
