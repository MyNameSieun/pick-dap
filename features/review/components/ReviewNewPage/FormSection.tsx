import Line from '@/components/common/Line';
import { ContentId } from '../../types/content';

interface FormSectionProps {
  title: string;
  children?: React.ReactNode;
  id: ContentId;
}
const FormSection = ({ title, children, id }: FormSectionProps) => {
  return (
    <>
      <section id={id} className="flex flex-col gap-5">
        <h3 className="h3 mb-3">{title}</h3>
        {children}
      </section>
      {id !== 'proof' && <Line my={12} />}
    </>
  );
};

export default FormSection;
