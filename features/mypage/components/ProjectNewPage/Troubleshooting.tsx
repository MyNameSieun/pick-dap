'use client';

import DynamicFieldList from '@/components/common/CreateForm/DynamicFieldList';
import FormItemLayout from '@/components/common/CreateForm/FormItemLayout';
import FormSection from '@/components/common/CreateForm/FormSection';
import { useCreateProjectStore } from '../../store/useCreateProjectStore';

const Troubleshooting = () => {
  const { formData, setField } = useCreateProjectStore();
  // 추가
  const handleAdd = () => {
    const newItem = {
      id: crypto.randomUUID(),
      description: '',
    };
    setField('troubleshootings', [...formData.troubleshootings, newItem]);
  };

  // 2. 삭제
  const handleRemove = (id: string) => {
    setField(
      'troubleshootings',
      formData.troubleshootings.filter((item) => item.id !== id),
    );
  };

  // 3. 수정
  const handleUpdate = (id: string, description: string) => {
    const newList = formData.troubleshootings.map((item) =>
      item.id === id ? { ...item, description } : item,
    );
    setField('troubleshootings', newList);
  };

  return (
    <FormSection title="5. 문제 해결 경험" id="troubleshooting">
      <FormItemLayout label="프로젝트 중 발생한 문제와 해결 과정을 작성해 주세요">
        <DynamicFieldList
          label="경험"
          placeholder="문제 상황 → 원인 파악 → 해결 과정 → 결과 순서로 작성하면 좋습니다"
          value={formData.troubleshootings}
          onAdd={handleAdd}
          onRemove={handleRemove}
          onUpdate={handleUpdate}
        />
      </FormItemLayout>
    </FormSection>
  );
};

export default Troubleshooting;
