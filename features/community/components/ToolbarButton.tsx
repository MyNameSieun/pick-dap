import { cva, VariantProps } from 'class-variance-authority';
import { icons } from 'lucide-react';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

// 1. 버튼 자체의 스타일 (배경색, 버튼 크기)
const buttonVariants = cva(
  'flex items-center justify-center transition-colors cursor-pointer rounded-md',
  {
    variants: {
      active: {
        true: 'bg-gray-200 text-black',
        false: 'bg-white text-gray-600 hover:bg-gray-100',
      },
      size: {
        default: 'w-[35px] h-[35px]',
      },
    },
    defaultVariants: {
      active: false,
      size: 'default',
    },
  },
);

// 2. 아이콘 크기 전용 스타일
const iconSizeVariants = {
  node: 'w-[22px] h-[22px]',
  marks: 'w-[18px] h-[18px]',
  image: 'w-[20px] h-[20px]',
};

type Props = VariantProps<typeof buttonVariants> &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    icon: keyof typeof icons;
    iconType: keyof typeof iconSizeVariants;
  };

const ToolbarButton = forwardRef<HTMLButtonElement, Props>(
  ({ icon, iconType, active, className, ...props }, ref) => {
    // 선택된 아이콘 컴포넌트 추출
    const Icon = icons[icon];

    return (
      <button
        ref={ref}
        // 버튼 스타일과 외부에서 들어온 className 병합
        className={cn(buttonVariants({ active }), className)}
        type="button" // 기본 submit 방지
        {...props}
      >
        <Icon className={iconSizeVariants[iconType]} />
      </button>
    );
  },
);

ToolbarButton.displayName = 'ToolbarButton';

export default ToolbarButton;
