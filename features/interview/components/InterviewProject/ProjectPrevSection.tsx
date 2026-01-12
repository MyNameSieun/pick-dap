import HeaderTitleBox from '@/components/common/HeaderTitleBox';
import { Button } from '@/components/ui/button/Button';
import { FolderOpen } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const ProjectPrevSection = () => {
  return (
    <>
      <div className={twMerge('container-col', 'w-2/5 gap-6 p-8')}>
        <div className="flex flex-col gap-2">
          <h5 className="h5 text-black">프로젝트 선택</h5>
          <p className="c1 text-gray-1000">
            질문 생성에 사용할 프로젝트를 선택하세요
          </p>
        </div>
        <div className="flex flex-col gap-4 rounded-[6px] border border-gray-500 p-4">
          <div className="mb-2 flex items-start justify-between">
            <HeaderTitleBox
              title={<h6 className="h6">프로젝트</h6>}
              content={<p className="c1">2개의 프로젝트</p>}
              icon={FolderOpen}
              bgColor="bg-highlight-light"
              iconColor="text-highlight-deep"
            />
            <Button variant="link" size="xs">
              + 추가하기
            </Button>
          </div>
          <div className="card-col">
            <p>프로젝트 이름</p>
          </div>
          <div className="card-col">
            <p>프로젝트 이름</p>
          </div>
        </div>

        <Button size="lg" className="font-bold">
          프로젝트 질문 생성하기
        </Button>
      </div>
    </>
  );
};
export default ProjectPrevSection;
