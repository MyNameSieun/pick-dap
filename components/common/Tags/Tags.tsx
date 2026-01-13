import { TAG_VARIANTS } from '@/constants/Tag.style';
import { Tag } from '@/types/tag.types';
import { twMerge } from 'tailwind-merge';
import { jobCategories } from '@/constants/jobCategories';

const Tags = ({
  size = 'small',
  color,
  children,
  className,
  category,
}: Tag) => {
  let resultColor = color;
  if (children === '답변 완료' || children === '합격') resultColor = 'green';
  else if (children === '미완료' || children === '불합격') resultColor = 'red';
  else if (children === '진행중' || children === '답변 대기')
    resultColor = 'yellow';
  else resultColor = 'purple';

  jobCategories.map((jobCategory) => {
    if (jobCategory === children) resultColor = 'blue';
  });

  if (category === true) resultColor = color;

  const baseStyle =
    'flex flex-row c2 rounded-3xl text-center items-center justify-center';
  return (
    <>
      {size === 'small' && (
        <div
          className={twMerge(
            baseStyle,
            'h-5 px-3',
            TAG_VARIANTS[resultColor || 'purple'],
            className,
          )}
        >
          {children}
        </div>
      )}
      {size === 'big' && (
        <div
          className={twMerge(
            baseStyle,
            'h-6 min-w-16 px-4',
            TAG_VARIANTS[resultColor || 'purple'],
            className,
          )}
        >
          {children}
        </div>
      )}
    </>
  );
};
export default Tags;
