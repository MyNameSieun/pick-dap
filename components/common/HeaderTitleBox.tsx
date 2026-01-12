import { LucideIcon } from 'lucide-react';

interface HeaderTitleBoxProps {
  title?: React.ReactNode;
  content?: React.ReactNode;
  icon: LucideIcon;
  bgColor?: string;
  iconColor?: string;
  titleColor?: string;
  subColor?: string;
}

const HeaderTitleBox = ({
  title,
  content,
  icon: Icon,
  bgColor = 'bg-blue-100',
  iconColor = 'text-blue-400',
  titleColor = 'text-gray-1000',
  subColor = 'text-gray-700',
}: HeaderTitleBoxProps) => {
  return (
    <div className="flex gap-4">
      <div className={`rounded-[5px] ${bgColor} p-4.5 shadow-sm`}>
        <Icon className={`${iconColor}`} />
      </div>
      <div className="flex flex-col justify-around">
        <div className={`text-[20px] font-bold ${titleColor}`}>{title}</div>
        <div className={`c1 ${subColor}`}>{content}</div>
      </div>
    </div>
  );
};

export default HeaderTitleBox;
