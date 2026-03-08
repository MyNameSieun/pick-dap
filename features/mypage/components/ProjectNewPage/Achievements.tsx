import DynamicFieldList from '@/components/common/CreateForm/DynamicFieldList';
import FormItemLayout from '@/components/common/CreateForm/FormItemLayout';
import FormSection from '@/components/common/CreateForm/FormSection';
import { useCreateProjectStore } from '../../store/useCreateProjectStore';

const Achievements = () => {
  const { formData, setField } = useCreateProjectStore();
  // 추가
  const handleAdd = () => {
    const newItem = {
      id: crypto.randomUUID(),
      description: '',
    };
    setField('performance', [...formData.performance, newItem]);
  };

  // 삭제
  const handleRemove = (id: string) => {
    setField(
      'performance',
      formData.performance.filter((item) => item.id !== id),
    );
  };

  // 수정
  const handleUpdate = (id: string, description: string) => {
    const newList = formData.performance.map((item) =>
      item.id === id ? { ...item, description } : item,
    );
    setField('performance', newList);
  };

  return (
    <FormSection title="6. 프로젝트 성과" id="achievements">
      <FormItemLayout label="프로젝트를 통해 얻은 성과를 작성해 주세요.">
        <DynamicFieldList
          label="성과"
          placeholder="예: Lighthouse 성능 점수 20% 향상, 초기 사용자 100명 달성, 코드 재사용성 증대로 개발 기간 1주일 단축"
          value={formData.performance}
          onAdd={handleAdd}
          onRemove={handleRemove}
          onUpdate={handleUpdate}
        />
      </FormItemLayout>
    </FormSection>
  );
};

export default Achievements;
