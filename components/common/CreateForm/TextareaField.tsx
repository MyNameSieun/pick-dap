import { Textarea } from '@/components/ui/textarea/Textarea';

interface TextareaFieldProps {
  placeholder: string;
  className?: string;
}

const TextareaField = ({ placeholder, className }: TextareaFieldProps) => {
  return (
    <div className="relative">
      <Textarea className={className} placeholder={placeholder} />
      <p className="c1 absolute right-0 text-gray-600">
        {Textarea.length}/최소 20자
      </p>
    </div>
  );
};

export default TextareaField;
