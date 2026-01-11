import { Button } from '@/components/ui/button/Button';
import { LucideIcon, Search } from 'lucide-react';

const InterviewButton = ({
  Icon = Search,
  children,
  onClick,
}: {
  Icon?: LucideIcon;
  children: string;
  onClick?: () => void;
}) => {
  return (
    <>
      <Button
        onClick={onClick}
        variant="white"
        className="flex h-20 min-w-80 justify-baseline gap-4 rounded-[12px] border-gray-400 p-4 shadow-xs"
      >
        <div className="bg-icon-light flex h-12 w-12 items-center justify-center rounded-[12px]">
          <Icon className="text-icon-deep size-6" />
        </div>
        <h6 className="text-black">{children}</h6>
      </Button>
    </>
  );
};
export default InterviewButton;
