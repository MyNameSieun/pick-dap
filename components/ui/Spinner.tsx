import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type SpinnerProps = {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const Spinner = ({ size = 'md', className }: SpinnerProps) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-10 w-10',
  };

  return (
    <div
      className={cn('flex items-center justify-center', className)}
      role="status"
    >
      <Loader2
        className={cn(
          'text-main-500 animate-spin opacity-80',
          sizeClasses[size],
        )}
      />
      <span className="sr-only">로딩 중...</span>
    </div>
  );
};

export default Spinner;
