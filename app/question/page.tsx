import TagSearchBar from "@/components/TagSearchBar";
import QuestionCardList from "../../features/question/components/QuestionCardList";
import Paging from "@/components/common/Paging";

const QuestionPage = () => {
  return (
    <div className="mx-auto w-full">
      <h3 className="mb-6.5">질문 탐색</h3>

      <TagSearchBar />
      <QuestionCardList />
      <Paging />
    </div>
  );
};

export default QuestionPage;
