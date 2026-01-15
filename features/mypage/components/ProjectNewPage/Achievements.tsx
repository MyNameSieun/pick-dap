import DynamicFieldList from '@/components/common/CreateForm/DynamicFieldList';
import FormItemLayout from '@/components/common/CreateForm/FormItemLayout';
import FormSection from '@/components/common/CreateForm/FormSection';

const Achievements = () => {
  return (
    <FormSection title="6. 프로젝트 성과" id="achievements">
      <FormItemLayout label="프로젝트를 통해 얻은 성과를 작성해 주세요 ">
        <DynamicFieldList
          label="성과"
          placeholder="프로젝트 결과와 함께 본인이 얻은 성과나 배운 점을 정리해 주세요"
        />
      </FormItemLayout>
    </FormSection>
  );
};

export default Achievements;
