import DynamicFieldList from '@/components/common/CreateForm/DynamicFieldList';
import FormItemLayout from '@/components/common/CreateForm/FormItemLayout';
import FormSection from '@/components/common/CreateForm/FormSection';
import { useCreateProjectStore } from '../../store/useCreateProjectStore';

const Features = () => {
  const { formData, setField } = useCreateProjectStore();

  // 추가
  const handleAdd = () => {
    const newItem = {
      id: crypto.randomUUID(),
      description: '',
    };
    setField('functions', [...formData.functions, newItem]);
  };

  // 2. 삭제
  const handleRemove = (id: string) => {
    setField(
      'functions',
      formData.functions.filter((item) => item.id !== id),
    );
  };

  // 3. 수정
  const handleUpdate = (id: string, description: string) => {
    const newList = formData.functions.map((item) =>
      item.id === id ? { ...item, description } : item,
    );
    setField('functions', newList);
  };

  return (
    <FormSection title="3. 핵심 기능" id="features">
      <FormItemLayout label="프로젝트의 핵심 기능과 구현 내용을 작성해 주세요.">
        <DynamicFieldList
          label="핵심 기능"
          placeholder="예: OpenAI API를 활용한 실시간 사용자 맞춤형 질문 생성 알고리즘 구현"
          value={formData.functions}
          onAdd={handleAdd}
          onRemove={handleRemove}
          onUpdate={handleUpdate}
        />
      </FormItemLayout>
    </FormSection>
  );
};

export default Features;
