import { Button } from "./ui/button/Button";
import { Input } from "./ui/input/input";

const TagSearchBar = () => {
  return (
    <section className="flex w-285 flex-col gap-6.5 rounded-[14px] bg-white py-10 shadow-sm">
      <article className="mx-9 flex flex-col gap-3">
        <h5>카테고리</h5>

        <div className="flex gap-3">
          <Button variant={"outline"} className="c1">
            Front
          </Button>
          <Button variant={"outline"} className="c1">
            Front
          </Button>
          <Button variant={"outline"} className="c1">
            Front
          </Button>
        </div>
      </article>

      <article className="mx-9 flex flex-col gap-3">
        <h5>보유 기술</h5>
        <Input
          className="c1 h-10 w-262 text-gray-600"
          type="text"
          placeholder="기술 스택을 입력해주세요 "
        />
      </article>

      <article className="mx-9 flex flex-col gap-3">
        <h5>정렬</h5>
        <div className="text-button-sm flex gap-7.5">
          <Button
            variant={"outline"}
            className="hover:border-main-400 hover:text-main-400 h-9 w-126"
          >
            추천순
          </Button>
          <Button
            variant={"outline"}
            className="hover:border-main-400 hover:text-main-400 h-9 w-126"
          >
            최신순
          </Button>
        </div>
      </article>
    </section>
  );
};

export default TagSearchBar;
