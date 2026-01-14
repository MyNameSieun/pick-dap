import HeaderTitleBox from '@/components/common/HeaderTitleBox';
import { Button } from '@/components/ui/button/Button';
import { Input } from '@/components/ui/input/Input';
import { Activity, Search, SquarePen } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const CommunityMain = () => {
  return (
    <>
      <div className={twMerge('container-row', 'w-full p-4')}>
        <HeaderTitleBox
          icon={Activity}
          title={<h4>커뮤니티</h4>}
          content={
            <p className="c1 text-gray-600">
              면접 경험을 공유하고 다른 사람들의 후기를 확인해보세요
            </p>
          }
        />
      </div>
      <div className="flex w-full items-center gap-4">
        <Input placeholder="검색어를 입력하세요" rightIcon={Search} />
        <Button className="h-10.5">
          <SquarePen />
          글쓰기
        </Button>
      </div>
    </>
  );
};
export default CommunityMain;
