import HeaderTitleBox from '@/components/common/HeaderTitleBox';
import { Button } from '@/components/ui/button/Button';
import { FolderOpen } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const ProjectPrevSection = () => {
  return (
    <>
      <div className={twMerge('container-col', 'w-2/5 gap-6 p-8')}>
        <div className="flex flex-col">
          <div className="flex justify-between">
            <h5 className="h5 text-black">프로젝트 선택</h5>
            <Button variant="link" size="xs">
              + 추가하기
            </Button>
          </div>

          <p className="c1 text-gray-800">
            질문 생성에 사용할 프로젝트를 선택하세요
          </p>
        </div>
        <div className="flex flex-col gap-4 rounded-[6px] border border-gray-200 p-4">
          <article className="card-row h-fit items-center">
            <div
              className={`bg-main-100 text-main-400 rounded-[5px] p-4.5 shadow-sm`}
            >
              <FolderOpen />
            </div>
            <p className="">프로젝트 이름1</p>
          </article>
          <article className="card-row h-fit items-center">
            <div
              className={`bg-main-100 text-main-400 rounded-[5px] p-4.5 shadow-sm`}
            >
              <FolderOpen />
            </div>
            <p className="">프로젝트 이름2</p>
          </article>
        </div>

        <Button size="lg" className="font-bold">
          프로젝트 질문 생성하기
        </Button>
      </div>
    </>
  );
};
export default ProjectPrevSection;
