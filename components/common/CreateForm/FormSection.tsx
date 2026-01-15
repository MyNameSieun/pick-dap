import Line from '@/components/common/Line';
import { ContentId } from '../../../features/review/types/content';

interface FormSectionProps {
  title: string;
  children?: React.ReactNode;
  id: ContentId;
}
const FormSection = ({ title, children, id }: FormSectionProps) => {
  return (
    <>
      <section id={id} className="flex flex-col">
        <h3 className="h3 mb-3">{title}</h3>
        <div className="flex flex-col gap-10">{children}</div>
      </section>
      {id !== 'proof' && <Line my={12} />}
    </>
  );
};

export default FormSection;
