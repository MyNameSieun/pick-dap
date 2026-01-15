import DynamicFieldList from '@/components/common/CreateForm/DynamicFieldList';
import FormItemLayout from '@/components/common/CreateForm/FormItemLayout';
import FormSection from '@/components/common/CreateForm/FormSection';

const Retrospective = () => {
  return (
    <FormSection title="7. 개선점 / 회고" id="retrospective">
      <FormItemLayout label="프로젝트 회고 및 개선 방향을 작성해 주세요">
        <DynamicFieldList
          label="개선점 & 회고"
          placeholder="진행 과정에서 아쉬웠던 부분과 향후 보완 방향을 작성해 주세요 "
        />
      </FormItemLayout>
    </FormSection>
  );
};

export default Retrospective;
