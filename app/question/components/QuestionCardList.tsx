import QuestionCardItem from "./QuestionCardItem";
import QuestionToolbar from "./QuestionToolbar";
import questionData from "@/data/questionData.json";

const QuestionCardList = () => {
  return (
    <section className="mt-10 flex flex-col gap-6.5 rounded-[14px] bg-white py-10 shadow-sm">
      <QuestionToolbar />

      <ul className="mx-9 grid grid-cols-3 gap-5">
        {questionData.map((question) => (
          <QuestionCardItem key={question.id} question={question} />
        ))}
      </ul>
    </section>
  );
};

export default QuestionCardList;
