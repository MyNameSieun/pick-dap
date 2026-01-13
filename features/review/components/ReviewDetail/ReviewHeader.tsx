import Line from '@/components/common/Line';
import Tags from '@/components/common/Tags/Tags';
import { Button } from '@/components/ui/button/Button';
import { BasicInfo, ResultInfo } from '@/features/interview/types/review';
import { EyeIcon, Heart, Minus } from 'lucide-react';

interface ReviewHeaderProps {
  basicInfo: BasicInfo;
  resultInfo: ResultInfo;
  stats: {
    viewCount: number;
    likeCount: number;
  };
}

const ReviewHeader = ({ basicInfo, resultInfo, stats }: ReviewHeaderProps) => {
  return (
    <section className="mt-8 mb-6">
      <article className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h3 className="text-gray-1000 text-2xl font-bold">
            {basicInfo.companyName}
          </h3>
          <Tags size="big">{resultInfo.finalStatus}</Tags>
        </div>
        <Button variant={'white'} className="flex gap-2 font-bold shadow-md">
          <Heart className="fill-gray-200" />1
        </Button>
      </article>

      <article className="flex justify-between text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <p>{basicInfo.jobCategory}</p>
          <Minus className="rotate-90 text-gray-400" size={16} />
          <p>{basicInfo.employmentType}</p>
        </div>
        <div className="flex items-center gap-4">
          <p>{basicInfo.interviewDate}</p>
          <p className="flex items-center gap-1">
            <EyeIcon size={15} />
            {stats.viewCount}
          </p>
        </div>
      </article>
      <div className="mt-5">
        <Line />
      </div>
    </section>
  );
};

export default ReviewHeader;
