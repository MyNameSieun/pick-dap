'use client';

import TextareaField from './TextareaField';
import { Plus } from 'lucide-react';
import { useDynamicFieldList } from '@/hooks/useDynamicFieldList';

interface DynamicFieldListProps {
  label: string;
  placeholder: string;
}

const DynamicFieldList = ({ label, placeholder }: DynamicFieldListProps) => {
  const { fields, addField, removeField } = useDynamicFieldList();

  return (
    <div className="flex flex-col gap-4">
      {fields.map(({ id }, index) => (
        <div
          key={id}
          className="relative rounded-md border border-gray-300 bg-white p-5"
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="b1 font-semibold text-gray-800">
              {label} {index + 1}
            </span>
            <button
              onClick={() => removeField(id)}
              className="caption text-point-heart cursor-pointer hover:underline"
            >
              삭제
            </button>
          </div>

          <TextareaField placeholder={placeholder} className="bg-gray-50" />
        </div>
      ))}

      <button
        type="button"
        onClick={addField}
        className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-gray-300 bg-gray-50 py-4 text-gray-700 hover:bg-gray-100"
      >
        <Plus size={16} />
        {label} 추가
      </button>
    </div>
  );
};

export default DynamicFieldList;
