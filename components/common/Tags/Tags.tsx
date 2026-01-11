import { TAG_VARIANTS } from '@/constants/Tag.style';
import { Tag } from '@/types/tag.types';
import { twMerge } from 'tailwind-merge';

const Tags = ({ size = 'small', color, children, className }: Tag) => {
  const baseStyle =
    'flex flex-row c2 rounded-3xl text-center items-center justify-center';
  return (
    <>
      {size === 'small' && (
        <div
          className={twMerge(
            baseStyle,
            'h-5 px-3',
            TAG_VARIANTS[color],
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
            TAG_VARIANTS[color],
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
