import { Textarea } from '@/components/ui/textarea/Textarea';
import { forwardRef } from 'react';

interface TextareaFieldProps {
  placeholder: string;
  className?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  ({ placeholder, className, value, onChange }, ref) => {
    return (
      <div className="relative">
        <Textarea
          ref={ref}
          value={value}
          onChange={onChange}
          className={className}
          placeholder={placeholder}
        />
        <p className="c1 absolute right-0 text-gray-600">
          {value?.length || 0}/최소 20자
        </p>
      </div>
    );
  },
);

TextareaField.displayName = 'TextareaField';
export default TextareaField;
