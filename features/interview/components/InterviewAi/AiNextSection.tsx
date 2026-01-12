import SelectCountBox from '@/components/common/SelectCountBox/SelectCountBox';
import { Lightbulb } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { Button } from '@/components/ui/button/Button';
import AiRoomCard from '@/components/common/AiRoomCard';

const AiNextSection = () => {
  return (
    <>
      <div className={twMerge('container-col', 'w-3/5 gap-8 p-9')}>
        <div className="flex items-start justify-between">
          <h6 className="h6 text-black">생성된 질문 (10개)</h6>
          <Button variant="white" className="h-9.5 font-bold">
            질문 담기
          </Button>
        </div>
        <div className="flex flex-col gap-3">
          <SelectCountBox count={0} state="save" className="min-w-full" />
          <AiRoomCard />
          <AiRoomCard />
        </div>
        <div className="my-4 flex flex-col items-center justify-center gap-5.5 text-gray-500">
          <Lightbulb size={100} />
          <h5 className="h5">옵션을 선택하고 질문을 생성해보세요</h5>
        </div>
      </div>
    </>
  );
};
export default AiNextSection;
