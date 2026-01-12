import { Input } from '@/components/ui/input/Input';
import { Send } from 'lucide-react';
import messageData from '@/data/interviewMessageData.json';
import InterviewMessage from './InterviewMessage/InterviewMessage';

const InterviewRoom = () => {
  const data = messageData as Message[];
  return (
    <>
      <div className="flex flex-col gap-6 overflow-auto">
        {data.map((v) => (
          <InterviewMessage key={v.id} target={v.target} message={v.message} />
        ))}
        <div className="flex-1" />
        <Input
          inputSize="lg"
          className="text-gray-1000"
          Icon={Send}
          placeholder="답변을 입력하세요..."
        />
      </div>
    </>
  );
};
export default InterviewRoom;
