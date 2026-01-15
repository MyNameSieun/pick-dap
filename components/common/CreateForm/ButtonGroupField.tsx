import { Button } from '@/components/ui/button/Button';

interface Option {
  label: string;
  value: string;
}

interface ButtonGroupFieldProps {
  options: string[] | Option[];
}

const ButtonGroupField = ({ options }: ButtonGroupFieldProps) => {
  return (
    <div className="flex gap-1">
      {options.map((option) => {
        const isObject = typeof option !== 'string';

        const displayLabel = isObject ? option.value : option;
        const dataValue = isObject ? option.label : option;

        return (
          <Button key={dataValue} className="px-7" variant={'white'}>
            {displayLabel}
          </Button>
        );
      })}
    </div>
  );
};

export default ButtonGroupField;
