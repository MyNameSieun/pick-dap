import HeaderTitleBox from "@/components/common/HeaderTitleBox";
import QuestionHeader from "../../components/QuestionHeader";
import BackButton from "@/components/common/BackButton";
import { Crown, Heart, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import Line from "@/components/common/Line";
import Image from "next/image";
import { Input } from "@/components/ui/input/input";

const QuestionPage = () => {
  return (
    <>
      <BackButton label={"질문으로 돌아가기"} />
      <QuestionHeader />

      <div className="text-gray-1000 b1 mt-15.5 mb-6">
        <HeaderTitleBox
          icon={Crown}
          title={"다른 사람 답변 비교"}
          content={`총 2개의 답변이 있습니다.`}
        />
      </div>

      <section className="rounded-[16] bg-white p-8">
        <article className="flex justify-between">
          <div>추후 프로필 추가</div>
          <Button variant={"outline"}>
            <Heart />
            123
          </Button>
        </article>

        <div className="mt-8">
          프로세스와 스레드는 사실 같이 비교할 대상이 아닌, 포함되는 관계입니다.
          프로세스는 운영체제 할당되는 작업의 단위를 의미하며, 스레드는 프로세스
          내에서 실행되는 작업의 단위를 뜻합니다.
        </div>

        <Line />
        <article className="flex gap-4">
          <Image src={""} alt="이미지" />
          <div className="flex flex-col gap-2">
            <div className="text-gray-1000 flex gap-2">
              <p className="b1 font-bold">건재2</p>
              <time className="c1 text-gray-700">2025.01.03</time>
            </div>
            <p className="text-gray-1000">
              와 이건 생각을 못했는데... 감사합니다!
            </p>
          </div>
        </article>

        <article className="flex items-center gap-5 mt-7">
          <Input placeholder="댓글을 입력하세요." />
          <Button variant={"default"}>등록</Button>
        </article>
      </section>
    </>
  );
};

export default QuestionPage;
