'use client';

import DynamicFieldList from '@/components/common/CreateForm/DynamicFieldList';
import FormItemLayout from '@/components/common/CreateForm/FormItemLayout';
import FormSection from '@/components/common/CreateForm/FormSection';
import { useCreateProjectStore } from '../../store/useCreateProjectStore';

const Role = () => {
  const { formData, setField } = useCreateProjectStore();
  // 추가
  const handleAdd = () => {
    const newItem = {
      id: crypto.randomUUID(),
      description: '',
    };
    setField('roles', [...formData.roles, newItem]);
  };

  // 2. 삭제
  const handleRemove = (id: string) => {
    setField(
      'roles',
      formData.roles.filter((item) => item.id !== id),
    );
  };

  // 3. 수정
  const handleUpdate = (id: string, description: string) => {
    const newList = formData.roles.map((item) =>
      item.id === id ? { ...item, description } : item,
    );
    setField('roles', newList);
  };

  return (
    <FormSection title="4. 담당 역할" id="role">
      <FormItemLayout label="팀 내에서 맡은 포지션과 기여도를 명확히 작성해 주세요.">
        <DynamicFieldList
          label="역할"
          placeholder="예: 프론트엔드 리드로서 공통 UI 컴포넌트 설계 및 Zustand를 활용한 전역 상태 관리 구조 구축"
          value={formData.roles}
          onAdd={handleAdd}
          onRemove={handleRemove}
          onUpdate={handleUpdate}
        />
      </FormItemLayout>
    </FormSection>
  );
};

export default Role;
