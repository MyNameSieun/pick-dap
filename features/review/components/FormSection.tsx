import Line from '@/components/common/Line';

interface FormSectionProps {
  title: string;
  children?: React.ReactNode;
}
const FormSection = ({ title, children }: FormSectionProps) => {
  return (
    <>
      <section className="flex flex-col gap-5">
        <h3 className="h3 mb-3">{title}</h3>
        {children}
      </section>
      <Line my={12} />
    </>
  );
};

export default FormSection;
