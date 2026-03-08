import FormItemLayout from '@/components/common/CreateForm/FormItemLayout';
import FormSection from '@/components/common/CreateForm/FormSection';
import { Input } from '@/components/ui/input/Input';
import { useCreateProjectStore } from '../../store/useCreateProjectStore';

const Deliverables = () => {
  const { formData, setField } = useCreateProjectStore();

  return (
    <FormSection title="8. 결과물" id="features">
      <div className="flex flex-col gap-4">
        <FormItemLayout label="배포 URL">
          <Input
            value={formData.deploy_url}
            onChange={(e) => setField('deploy_url', e.target.value)}
            placeholder="예: https://your-project.vercel.app"
          />
        </FormItemLayout>
        <FormItemLayout label="GitHub 링크">
          <Input
            value={formData.github_url}
            onChange={(e) => setField('github_url', e.target.value)}
            placeholder="예: https://github.com/username/project-name"
          />
        </FormItemLayout>
      </div>
    </FormSection>
  );
};

export default Deliverables;
