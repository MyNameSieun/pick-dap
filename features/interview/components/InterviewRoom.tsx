import { Input } from '@/components/ui/input/Input';
import { Send } from 'lucide-react';

const InterviewRoom = () => {
  return (
    <>
      <Input
        inputSize="lg"
        className="text-gray-1000"
        Icon={Send}
        placeholder="답변을 입력하세요..."
      />
    </>
  );
};
export default InterviewRoom;
