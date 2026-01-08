import TagSearchBar from "@/components/TagSearchBar";
import QuestionCardList from "./components/QuestionCardList";
import Paging from "@/components/common/Paging";

const QuestionPage = () => {
  return (
    <main className="mx-auto my-11 w-max">
      <h3 className="mb-6.5">질문 탐색</h3>

      <TagSearchBar />
      <QuestionCardList />
      <Paging />
    </main>
  );
};

export default QuestionPage;
