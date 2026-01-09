import { Calendar } from "lucide-react";

interface HeaderTitleBoxProps {
  title: React.ReactNode;
  content: React.ReactNode;
}

const HeaderTitleBox = ({ title, content }: HeaderTitleBoxProps) => {
  return (
    <div className="flex gap-4">
      <div className="rounded-[5] bg-blue-100 p-4.5">
        <Calendar className="text-blue-400" />
      </div>
      <div className="flex flex-col justify-between">
        <h4 className="font-bold">{title}</h4>
        <div className="c1 text-gray-700">{content}</div>
      </div>
    </div>
  );
};

export default HeaderTitleBox;
