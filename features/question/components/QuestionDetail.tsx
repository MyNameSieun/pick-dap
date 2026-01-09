"use client";

import { Button } from "@/components/ui/button/Button";
import { Sparkle, Users } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import questionData from "@/data/questionData.json";

const QuestionDetail = () => {
  const router = useRouter();
  const params = useParams();
  const data = questionData.find((question) => question.id === params.id);
  if (!data) return <p>존재하지 않는 질문입니다.</p>;

  return (
    <>
      <div className="text-gray-1000 mt-10 flex gap-5">
        <Button
          onClick={() => router.push(`/question/${params.id}/list`)}
          variant={"white"}
          className="flex-1 gap-2 py-7"
        >
          <Users />
          다른 사람 답변 비교
        </Button>
        <Button
          onClick={() => router.push(`/question/${params.id}/ai`)}
          variant={"white"}
          className="flex-1 gap-2 py-7"
        >
          <Sparkle />
          AI 답변 분석
        </Button>
      </div>
    </>
  );
};
export default QuestionDetail;
