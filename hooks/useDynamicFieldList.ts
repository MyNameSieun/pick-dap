import { useState } from 'react';

interface IField {
  id: string;
  content: string;
}
const init = [{ id: '1', content: '' }];

export const useDynamicFieldList = () => {
  const [fields, setFields] = useState<IField[]>(init);

  const addField = () => {
    const newField: IField = {
      id: Date.now().toString(),
      content: '',
    };
    setFields((prev) => [...prev, newField]);
  };

  const removeField = (targetId: string) => {
    setFields((prev) => prev.filter((fields) => fields.id !== targetId));
  };

  return { fields, addField, removeField };
};
