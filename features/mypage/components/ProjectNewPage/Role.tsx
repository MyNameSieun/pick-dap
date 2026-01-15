import DynamicFieldList from '@/components/common/CreateForm/DynamicFieldList';
import FormItemLayout from '@/components/common/CreateForm/FormItemLayout';
import FormSection from '@/components/common/CreateForm/FormSection';

const Role = () => {
  return (
    <FormSection title="4. 담당 역할" id="role">
      <FormItemLayout label="프로젝트에서 맡은 역할과 담당 업무를 작성해 주세요  ">
        <DynamicFieldList
          label="역할"
          placeholder="프로젝트에서 맡은 역할과 담당 업무를 작성해 주세요  "
        />
      </FormItemLayout>
    </FormSection>
  );
};

export default Role;
