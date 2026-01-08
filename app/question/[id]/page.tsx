"use client";
import { Button } from "@/components/ui/button";
import questionData from "@/data/questionData.json";
import { ChevronLeft, Sparkle, Users } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import QuestionHeader from "../components/QuestionHeader";
import BackButton from "@/components/common/BackButton";
const QuestionPage = () => {
  const router = useRouter();
  const params = useParams();
  const data = questionData.find((question) => question.id === params.id);
  if (!data) return <p>존재하지 않는 질문입니다.</p>;

  return (
    <div className="flex flex-col">
      <BackButton label={"뒤로가기"} />
      <QuestionHeader />

      <div className="text-gray-1000 mt-10 flex gap-5">
        <Button
          onClick={() => router.push(`/question/${params.id}/list`)}
          variant={"outline"}
          className="flex-1 gap-2 py-7"
        >
          <Users />
          다른 사람 답변 비교
        </Button>
        <Button
          onClick={() => router.push(`/question/${params.id}/ai`)}
          variant={"outline"}
          className="flex-1 gap-2 py-7"
        >
          <Sparkle />
          AI 답변 분석
        </Button>
      </div>
    </div>
  );
};

export default QuestionPage;
