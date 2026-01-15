import DynamicFieldList from '@/components/common/CreateForm/DynamicFieldList';
import FormItemLayout from '@/components/common/CreateForm/FormItemLayout';
import FormSection from '@/components/common/CreateForm/FormSection';

const TechStack = () => {
  return (
    <FormSection title="2. 기술스택" id="tech-stack">
      <FormItemLayout label="프로젝트명">
        <DynamicFieldList
          label="기술 스택"
          placeholder="사용한 기술과 이를 선택한 배경을 작성해 주세요"
        />
      </FormItemLayout>
    </FormSection>
  );
};

export default TechStack;
