import { LucideIcon } from 'lucide-react';
import { Button } from '../ui/button/Button';

interface HeaderTitleBoxProps {
  title?: React.ReactNode;
  content?: React.ReactNode;
  icon: LucideIcon;

  colorOption?: {
    bgColor?: string;
    iconColor?: string;
    titleColor?: string;
    subColor?: string;
  };

  buttonOption?: {
    text: string;
    action?: () => void;
    variant?: 'default' | 'white';
  };
}

const HeaderTitleBox = ({
  title,
  content,
  icon: Icon,
  colorOption: {
    bgColor = 'bg-blue-100',
    iconColor = 'text-blue-400',
    titleColor = 'text-gray-1000',
    subColor = 'text-gray-700',
  } = {},

  buttonOption,
}: HeaderTitleBoxProps) => {
  return (
    <div className="flex justify-between">
      <div className="flex gap-4">
        <div className={`rounded-[5px] ${bgColor} p-4.5 shadow-sm`}>
          <Icon className={`${iconColor}`} />
        </div>
        <div className="flex flex-col justify-around">
          <div className={`text-[20px] font-bold ${titleColor}`}>{title}</div>
          <div className={`c1 ${subColor}`}>{content}</div>
        </div>
      </div>

      {buttonOption && (
        <Button
          onClick={buttonOption.action}
          variant={buttonOption.variant || 'default'}
        >
          {buttonOption.text}
        </Button>
      )}
    </div>
  );
};

export default HeaderTitleBox;
