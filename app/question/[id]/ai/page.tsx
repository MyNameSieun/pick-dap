"use client";

import questionData from "@/data/questionData.json";
import { useParams } from "next/navigation";
import QuestionHeader from "../../components/QuestionHeader";
import BackButton from "@/components/common/BackButton";
import HeaderTitleBox from "@/components/common/HeaderTitleBox";

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
      <HeaderTitleBox
        title={"프로젝트 추가 "}
        content={"자세히 입력할수록 AI가 더 정확한 질문을 생성할 수 있습니다."}
      />
    </>
  );
};

export default InterviewAiPage;
