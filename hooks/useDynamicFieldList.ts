'use client';

import { useReviewStore } from '@/features/review/store/reviewStore';

export const useDynamicFieldList = () => {
  const { formData, setField } = useReviewStore();
  const questions = formData.questions;

  // 추가
  const addField = () => {
    const newQuestion = { id: crypto.randomUUID(), review_content: '' };
    setField('questions', [...questions, newQuestion]);
  };

  // 삭제
  const removeField = (targetId: string) => {
    if (questions.length == 1) return;
    const updatedQuestions = questions.filter((q) => q.id !== targetId);
    setField('questions', updatedQuestions);
  };

  // 수정
  const updateField = (targetId: string, value: string) => {
    const updated = questions.map((q) =>
      q.id === targetId ? { ...q, review_content: value } : q,
    );
    setField('questions', updated);
  };

  return { questions, addField, removeField, updateField };
};
