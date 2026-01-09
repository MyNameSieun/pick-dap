import { LucideIcon } from 'lucide-react';

interface HeaderTitleBoxProps {
  title: React.ReactNode;
  content: React.ReactNode;
  icon: LucideIcon;
}

const HeaderTitleBox = ({
  title,
  content,
  icon: Icon,
}: HeaderTitleBoxProps) => {
  return (
    <div className="flex gap-4">
      <div className="rounded-[5] bg-blue-100 p-4.5">
        <Icon className="text-blue-400" />
      </div>
      <div className="flex flex-col justify-between">
        <h4 className="font-bold">{title}</h4>
        <div className="c1 text-gray-700">{content}</div>
      </div>
    </div>
  );
};

export default HeaderTitleBox;
