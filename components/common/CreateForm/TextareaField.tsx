import { Textarea } from '@/components/ui/textarea/Textarea';

interface TextareaFieldProps {
  placeholder: string;
  className?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextareaField = ({
  placeholder,
  className,
  value,
  onChange,
}: TextareaFieldProps) => {
  return (
    <div className="relative">
      <Textarea
        value={value}
        onChange={onChange}
        className={className}
        placeholder={placeholder}
      />
      <p className="c1 absolute right-0 text-gray-600">
        {Textarea.length}/최소 20자
      </p>
    </div>
  );
};

export default TextareaField;
