import { Button } from '@/components/ui/button/Button';
import { Crown } from 'lucide-react';

const EmptyStateBox = () => {
  return (
    <div className="text-gray-1000 flex h-92 flex-col items-center justify-center gap-7 rounded-[16] border border-dashed border-gray-400 bg-white">
      <div className="bg-bg-deep rounded-[5] p-4.5">
        <Crown />
      </div>
      <div>
        <h5>아직 답변이 없습니다</h5>
        <div className="c1">첫 번째로 답변을 작성해보세요!</div>
      </div>
      <Button variant={'white'} className="border-1">
        답변 작성하기
      </Button>
    </div>
  );
};

export default EmptyStateBox;
