import RequiredMark from '@/components/common/RequiredMark';

interface FormItemLayoutProps {
  label: string;
  isRequired?: boolean;
  children: React.ReactNode;
  className?: string;
}

const FormItemLayout = ({
  label,
  isRequired,
  children,
  className,
}: FormItemLayoutProps) => (
  <article className="flex flex-col gap-1">
    <label className={`b2 text-gray-900 ${className}`}>
      {label} {isRequired && <RequiredMark />}
    </label>
    {children}
  </article>
);

export default FormItemLayout;
