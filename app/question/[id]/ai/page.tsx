import QuestionAi from "@/features/question/components/QuestionAi";
import QuestionHeader from "../../../../features/question/components/QuestionHeader";
import BackButton from "@/components/common/BackButton";

const InterviewAiPage = () => {
  return (
    <>
      <BackButton label={"질문으로 돌아가기"} />
      <QuestionHeader />
      <QuestionAi />
    </>
  );
};

export default InterviewAiPage;
