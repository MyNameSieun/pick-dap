import { Button } from '@/components/ui/button/Button';
import { Pencil, Trash } from 'lucide-react';

const CommunityManageButton = () => {
  return (
    <div className="bodrer-gray-100 flex w-fit flex-col border bg-gray-100 shadow-md">
      <Button className="h-10 w-22 gap-3 font-semibold" variant="ghost">
        <Pencil />
        수정
      </Button>
      <Button className="h-10 w-22 gap-3 font-semibold" variant="ghost">
        <Trash />
        삭제
      </Button>
    </div>
  );
};
export default CommunityManageButton;
