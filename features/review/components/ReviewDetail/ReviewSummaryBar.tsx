import { LucideIcon } from 'lucide-react';
import StarRate from '../StarRate';

interface ReviewSummaryBarProps {
  label: string;
  value: string | number;
  Icon: LucideIcon;
  isRate?: boolean;
}

const ReviewSummaryBar = ({
  topSummaries,
}: {
  topSummaries: ReviewSummaryBarProps[];
}) => {
  return (
    <section className="grid grid-cols-2 gap-4 rounded-2xl border border-gray-200 bg-white p-8 md:grid-cols-4 md:gap-8">
      {topSummaries.map(({ label, value, Icon, isRate }) => (
        <article key={label} className="flex flex-col items-center gap-4 py-2">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-50 text-gray-700 transition-colors group-hover:bg-blue-50 group-hover:text-blue-500">
            <Icon size={32} />
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
              {label}
            </span>
            {isRate ? (
              <StarRate count={Number(value)} />
            ) : (
              <span className="text-lg font-bold text-gray-900">
                {String(value)}
              </span>
            )}
          </div>
        </article>
      ))}
    </section>
  );
};
export default ReviewSummaryBar;
