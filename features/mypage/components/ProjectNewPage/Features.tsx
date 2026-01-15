import DynamicFieldList from '@/components/common/CreateForm/DynamicFieldList';
import FormItemLayout from '@/components/common/CreateForm/FormItemLayout';
import FormSection from '@/components/common/CreateForm/FormSection';

const Features = () => {
  return (
    <FormSection title="3. 핵심 기능" id="features">
      <FormItemLayout label="프로젝트의 핵심 기능과 구현 내용을 작성해 주세요">
        <DynamicFieldList
          label="핵심 기능"
          placeholder="프로젝트에서 중요했던 기능 위주로 무엇을 구현했는지 작성해 주세요 "
        />
      </FormItemLayout>
    </FormSection>
  );
};

export default Features;
