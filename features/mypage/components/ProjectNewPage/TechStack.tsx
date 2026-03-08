'use client';

import DynamicFieldList from '@/components/common/CreateForm/DynamicFieldList';
import FormItemLayout from '@/components/common/CreateForm/FormItemLayout';
import FormSection from '@/components/common/CreateForm/FormSection';
import { useCreateProjectStore } from '../../store/useCreateProjectStore';

const TechStack = () => {
  const { formData, setField } = useCreateProjectStore();
  // 추가
  const handleAdd = () => {
    const newItem = {
      id: crypto.randomUUID(),
      description: '',
    };
    setField('tech_stacks', [...formData.tech_stacks, newItem]);
  };

  // 삭제
  const handleRemove = (id: string) => {
    setField(
      'tech_stacks',
      formData.tech_stacks.filter((item) => item.id !== id),
    );
  };

  // 수정
  const handleUpdate = (id: string, description: string) => {
    const newList = formData.tech_stacks.map((item) =>
      item.id === id ? { ...item, description } : item,
    );
    setField('tech_stacks', newList);
  };

  return (
    <FormSection title="2. 기술스택" id="tech-stack">
      <FormItemLayout label="해당 기술을 선택한 이유와 이를 통해 해결하고자 했던 기술적 과제를 작성해 주세요.">
        <DynamicFieldList
          label="기술 스택"
          placeholder="예: Next.js의 SSR을 활용해 SEO 최적화와 초기 로딩 속도 개선"
          value={formData.tech_stacks}
          onAdd={handleAdd}
          onRemove={handleRemove}
          onUpdate={handleUpdate}
        />
      </FormItemLayout>
    </FormSection>
  );
};

export default TechStack;
