"use client";

import questionData from "@/data/questionData.json";
import { useParams } from "next/navigation";
import QuestionHeader from "../../components/QuestionHeader";
import BackButton from "@/components/common/BackButton";

const InterviewAiPage = () => {
  const params = useParams();

  const data = questionData.find((question) => question.id === params.id);
  if (!data) return <p>존재하지 않는 질문입니다.</p>;

  return (
    <>
      <div className="flex flex-col">
        <BackButton label={"질문으로 돌아가기"} />
        <QuestionHeader />
      </div>
    </>
  );
};

export default InterviewAiPage;
