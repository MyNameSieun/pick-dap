import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const textareaVariants = cva(
  'text-gray-1000 placeholder:text-gray-500 selection:bg-main-500 selection:text-white dark:bg-input/30 border-input w-full min-w-0 cursor-pointer rounded-md border bg-transparent transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:border-main-400 focus-visible:ring-main-400/50 focus-visible:ring-[2px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
  {
    variants: {
      variant: {
        default: 'bg-bg-light border-input',
        gray: 'bg-muted/50 border-transparent focus-visible:bg-transparent',
        ghost: 'border-transparent bg-transparent shadow-none hover:bg-muted',
      },
      textareaSize: {
        default: 'px-4 py-3.5 b2 min-h-32',
        sm: 'px-4 py-2.5 c1 min-h-24',
        lg: 'px-6 py-5 b1 min-h-48',
      },
    },
    defaultVariants: {
      variant: 'default',
      textareaSize: 'default',
    },
  },
);

export interface TextareaProps
  extends
    React.ComponentProps<'textarea'>,
    VariantProps<typeof textareaVariants> {}

function Textarea({
  className,
  variant,
  textareaSize,
  ...props
}: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        textareaVariants({ variant, textareaSize }),
        'field-sizing-content resize-none',
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
