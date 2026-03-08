import DynamicFieldList from '@/components/common/CreateForm/DynamicFieldList';
import FormItemLayout from '@/components/common/CreateForm/FormItemLayout';
import FormSection from '@/components/common/CreateForm/FormSection';
import { useCreateProjectStore } from '../../store/useCreateProjectStore';

const Retrospective = () => {
  const { formData, setField } = useCreateProjectStore();
  // 추가
  const handleAdd = () => {
    const newItem = {
      id: crypto.randomUUID(),
      description: '',
    };
    setField('retrospectives', [...formData.retrospectives, newItem]);
  };

  // 삭제
  const handleRemove = (id: string) => {
    setField(
      'retrospectives',
      formData.retrospectives.filter((item) => item.id !== id),
    );
  };

  // 수정
  const handleUpdate = (id: string, description: string) => {
    const newList = formData.retrospectives.map((item) =>
      item.id === id ? { ...item, description } : item,
    );
    setField('retrospectives', newList);
  };
  return (
    <FormSection title="7. 개선점 / 회고" id="retrospective">
      <FormItemLayout label="프로젝트 회고 및 개선 방향을 작성해 주세요.">
        <DynamicFieldList
          label="개선점 & 회고"
          placeholder="예: TDD 도입의 필요성 절감, 서버 부하 분산 처리 미흡에 대한 아쉬움"
          value={formData.retrospectives}
          onAdd={handleAdd}
          onRemove={handleRemove}
          onUpdate={handleUpdate}
        />
      </FormItemLayout>
    </FormSection>
  );
};

export default Retrospective;
