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
  onValueChange?: (value: string) => void;
}
const FormSelect = ({
  options,
  defaultValue,
  placeholder,
  label,
  className = 'w-[180px]',
  onValueChange,
}: FormSelectProps) => {
  return (
    <Select onValueChange={onValueChange} defaultValue={defaultValue}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent position="popper">
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

export default FormSelect;
