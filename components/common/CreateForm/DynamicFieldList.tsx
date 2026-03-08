'use client';

import TextareaField from './TextareaField';
import { Plus } from 'lucide-react';

interface DynamicFieldListProps {
  label: string;
  placeholder: string;
  value: { id: string; description: string }[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, content: string) => void;
}

const DynamicFieldList = ({
  label,
  placeholder,
  value,
  onAdd,
  onRemove,
  onUpdate,
}: DynamicFieldListProps) => {
  return (
    <div className="flex flex-col gap-4">
      {value?.map(({ id, description }, index) => (
        <div
          key={id}
          className="relative rounded-md border border-gray-300 bg-white p-5"
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="b1 font-semibold text-gray-800">
              {label} {index + 1}
            </span>
            <button
              onClick={() => onRemove(id)}
              className="caption text-point-heart cursor-pointer hover:underline"
            >
              삭제
            </button>
          </div>

          <TextareaField
            placeholder={placeholder}
            className="bg-gray-50"
            value={description}
            onChange={(e) => onUpdate(id, e.target.value)}
          />
        </div>
      ))}

      <button
        type="button"
        onClick={onAdd}
        className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-gray-300 bg-gray-50 py-4 text-gray-700 hover:bg-gray-100"
      >
        <Plus size={16} />
        {label} 추가
      </button>
    </div>
  );
};

export default DynamicFieldList;
