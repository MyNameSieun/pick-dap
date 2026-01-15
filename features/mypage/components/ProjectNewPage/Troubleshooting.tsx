import DynamicFieldList from '@/components/common/CreateForm/DynamicFieldList';
import FormItemLayout from '@/components/common/CreateForm/FormItemLayout';
import FormSection from '@/components/common/CreateForm/FormSection';

const Troubleshooting = () => {
  return (
    <FormSection title="5. 문제 해결 경험" id="troubleshooting">
      <FormItemLayout label="프로젝트 중 발생한 문제와 해결 과정을 작성해 주세요">
        <DynamicFieldList
          label="경험"
          placeholder="문제 상황 → 원인 파악 → 해결 과정 → 결과 순서로 작성하면 좋습니다"
        />
      </FormItemLayout>
    </FormSection>
  );
};

export default Troubleshooting;
