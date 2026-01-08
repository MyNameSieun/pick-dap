import { Input } from "@/components/ui/input/input";
import { Search } from "lucide-react";

const QuestionToolbar = () => {
  return (
    <article className="mx-9">
      <div className="relative">
        <Input
          className="c1 text-gray-1000 h-10 w-262"
          type="text"
          placeholder="기술 스택을 입력해주세요 "
        />
        <Search className="text-icon-default pointer-events-none absolute top-1/2 right-10 -translate-y-1/2" />
      </div>
    </article>
  );
};

export default QuestionToolbar;
