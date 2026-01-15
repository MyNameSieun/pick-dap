import FormItemLayout from '@/components/common/CreateForm/FormItemLayout';
import FormSection from '@/components/common/CreateForm/FormSection';
import { Input } from '@/components/ui/input/Input';

const Deliverables = () => {
  return (
    <FormSection title="8. 결과물" id="features">
      <div className="flex flex-col gap-4">
        <FormItemLayout label="배포 URL">
          <Input placeholder="예: https://your-project.vercel.app" />
        </FormItemLayout>
        <FormItemLayout label="GitHub 링크">
          <Input placeholder="예: https://github.com/username/project-name" />
        </FormItemLayout>
      </div>
    </FormSection>
  );
};

export default Deliverables;
