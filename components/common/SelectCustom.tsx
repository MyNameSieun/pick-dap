import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';

interface SelectOption {
  label: string;
  value: string;
}

interface FormSelectProps {
  options: SelectOption[];
  defaultValue?: string;
  placeholder?: string;
  label?: string;
  className?: string;
  required?: boolean;
  onValueChange?: (value: string) => void;
}
const SelectCustom = ({
  options,
  defaultValue,
  placeholder,
  label,
  className = 'w-[180px]',
  required,
  onValueChange,
}: FormSelectProps) => {
  return (
    <Select
      onValueChange={onValueChange}
      defaultValue={defaultValue}
      required={required}
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent position="popper" className="z-[110]">
        <SelectGroup>
          {label && <SelectLabel>{label}</SelectLabel>}

          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectCustom;
