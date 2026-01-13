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
    <section className="flex justify-center gap-10 rounded-lg border border-gray-300 bg-white py-8 shadow-sm">
      {topSummaries.map(({ label, value, Icon, isRate }) => (
        <article
          key={label}
          className="flex min-w-[120px] flex-col items-center"
        >
          <div className="mb-4 rounded-2xl border border-gray-200 bg-gray-100 p-6">
            <Icon size={40} className="text-gray-600" />
          </div>
          <p className="mb-1 text-xs text-gray-500">{label}</p>
          {isRate ? (
            <StarRate count={Number(value)} />
          ) : (
            <p className="text-gray-1000 text-base font-bold">
              {String(value)}
            </p>
          )}
        </article>
      ))}
    </section>
  );
};
export default ReviewSummaryBar;
