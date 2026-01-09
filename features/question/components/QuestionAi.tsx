"use client";
import { useParams } from "next/navigation";
import questionData from "@/data/questionData.json";
import HeaderTitleBox from "@/components/common/HeaderTitleBox";
import { Sparkle } from "lucide-react";

const QuestionAi = () => {
  const params = useParams();
  const data = questionData.find((question) => question.id === params.id);
  const feedbackText = `
    안녕하세요! 면접 피드백을 제공하는 AI 파트너로서 답변을 분석해 드릴게요.
        제출하신 답변은 정의 자체는 틀리지 않았지만, 기술 면접용 답변으로는 다소
        부족함이 있습니다.
        
        면접관은 단순히 '크기'의 차이가 아니라, 두 개념의
        자원 공유 방식과 독립성에 대해 알고 있는지를 확인하고 싶어 하기
        때문입니다. 따라서, 다음과 같은 답변을 제시해드릴게요! "프로세스는
        운영체제로부터 자원을 할당받는 독립적인 실행 단위이며, 스레드는 프로세스
        내에서 실행되는 여러 흐름의 단위입니다. 
        
        가장 큰 차이점은 자원 공유
        여부입니다. 프로세스는 각각 독립된 메모리 영역을 가져서 서로의 영역에
        직접 접근할 수 없지만, 스레드는 프로세스 내의 Heap 영역 등을 공유하기
        때문에 통신이 빠르고 효율적이라는 특징이 있습니다."
  `;

  if (!data) return <p>존재하지 않는 질문입니다.</p>;

  return (
    <>
      <div className="text-gray-1000 b1 mt-15.5 mb-6">
        <HeaderTitleBox
          icon={Sparkle}
          title={"AI 답변 분석"}
          content={"AI가 답변을 분석하여 피드백을 제공합니다."}
        />
      </div>

      <div className="rounded-[16] bg-white p-8">{feedbackText}</div>
    </>
  );
};
export default QuestionAi;
