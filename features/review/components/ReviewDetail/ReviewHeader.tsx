import Line from '@/components/common/Line';
import Tags from '@/components/common/Tags/Tags';
import { Button } from '@/components/ui/button/Button';

import { EyeIcon, Heart, Minus } from 'lucide-react';
import { RawReviewJoined } from '../../services/fetchReviewData';

const ReviewHeader = ({ review }: { review: RawReviewJoined }) => {
  const {
    company_name,
    final_status_type,
    interview_year,
    interview_season,
    employment_type,
    view_count,
    job_role,
  } = review;

  return (
    <section className="mt-8 mb-6">
      <article className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h3 className="text-gray-1000 text-2xl font-bold">{company_name}</h3>
          <Tags size="big">{final_status_type}</Tags>
        </div>
        <Button variant={'white'} className="flex gap-2 font-bold shadow-md">
          <Heart className="fill-gray-200" />1
        </Button>
      </article>

      <article className="flex justify-between text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <p>{job_role.name}</p>
          <Minus className="rotate-90 text-gray-400" size={16} />
          <p>{employment_type}</p>
        </div>
        <div className="flex items-center gap-4">
          <p>
            {interview_season} {interview_year}
          </p>
          <p className="flex items-center gap-1">
            <EyeIcon size={15} />
            {view_count}
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
