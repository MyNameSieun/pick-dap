import { Button } from '@/components/ui/button/Button';

interface Option {
  label: string;
  value: string;
}

interface ButtonGroupFieldProps {
  options: string[] | Option[];
  value?: string | string[];
  onValueChange?: (value: string) => void;
}

const ButtonGroupField = ({
  options,
  value,
  onValueChange,
}: ButtonGroupFieldProps) => {
  return (
    <div className="flex gap-1">
      {options.map((option) => {
        const isObject = typeof option !== 'string';

        const displayLabel = isObject ? option.label : option;
        const dataValue = isObject ? option.value : option;

        const isSelected = Array.isArray(value)
          ? value.includes(dataValue)
          : value === dataValue;

        return (
          <Button
            key={dataValue}
            type="button" // 폼 제출 방지
            className="px-7"
            variant={isSelected ? 'default' : 'white'}
            onClick={() => onValueChange?.(dataValue)}
          >
            {displayLabel}
          </Button>
        );
      })}
    </div>
  );
};

export default ButtonGroupField;
