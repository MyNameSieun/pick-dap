import { Button } from '@/components/ui/button/Button';

interface Option {
  label: string;
  value: string;
}

interface ButtonGroupFieldProps {
  // string 배열일 수도 있고, Option 객체 배열일 수도 있음
  options: string[] | Option[];
}

const ButtonGroupField = ({ options }: ButtonGroupFieldProps) => {
  return (
    <div className="flex gap-1">
      {options.map((option) => {
        // 데이터 형태에 따라 값을 추출
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
