import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

const inputVariants = cva(
  'text-gray-1000 file:text-gray-500 placeholder:text-gray-500 selection:bg-main-500 selection:text-white dark:bg-input/30 border-input w-full min-w-0 cursor-pointer rounded-md border bg-transparent transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:border-main-400 focus-visible:ring-main-400/50 focus-visible:ring-[2px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
  {
    variants: {
      variant: {
        default: 'bg-bg-light border-input',
        gray: 'bg-muted/50 border-transparent focus-visible:bg-transparent',
        ghost: 'border-transparent bg-transparent shadow-none hover:bg-muted',
      },
      inputSize: {
        default: 'h-12 px-4 py-3.5 b2',
        sm: 'h-10 px-4 py-2.5 c1',
        lg: 'h-16 px-6 py-5 b1',
      },
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'default',
    },
  },
);

export interface InputProps
  extends React.ComponentProps<'input'>, VariantProps<typeof inputVariants> {
  Icon?: LucideIcon;
}

function Input({
  className,
  variant,
  inputSize,
  type,
  Icon,
  ...props
}: InputProps) {
  return (
    <div className="relative w-full">
      <input
        type={type}
        data-slot="input"
        className={cn(
          inputVariants({ variant, inputSize }),
          inputSize === 'lg' ? 'pr-14' : 'pr-11',
          className,
        )}
        {...props}
      />
      {Icon && (
        <div
          className={cn(
            'text-icon-default pointer-events-none absolute top-1/2 -translate-y-1/2',
            inputSize === 'lg' ? 'right-6' : 'right-4',
          )}
        >
          <Icon size={inputSize === 'lg' ? 20 : 16} />
        </div>
      )}
    </div>
  );
}

export { Input };
