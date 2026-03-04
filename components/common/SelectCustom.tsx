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
  allLabel?: string;
  className?: string;
  required?: boolean;
  value?: string;
  onValueChange?: (value: string) => void;
}
const SelectCustom = ({
  options,
  defaultValue,
  placeholder,
  label,
  allLabel,
  className = 'w-[180px]',
  required,
  value,
  onValueChange,
}: FormSelectProps) => {
  return (
    <Select
      onValueChange={onValueChange}
      defaultValue={defaultValue}
      required={required}
      value={value}
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent position="popper" className="z-[110]">
        <SelectGroup>
          {label && <SelectLabel>{label}</SelectLabel>}
          {allLabel && (
            <SelectItem value="ALL" className="text-gray-700">
              {allLabel}
            </SelectItem>
          )}
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="text-gray-900"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectCustom;
