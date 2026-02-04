import { create } from 'zustand';
import { combine, devtools } from 'zustand/middleware';
import { useModalStackStore } from './modalStack';
import { MODAL_ID } from '@/constants/modalNames';

const initialState = {
  isOpen: false,
};

export const useCreateQuestionModalStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        open: () => {
          set({ isOpen: true });
          useModalStackStore.getState().push(MODAL_ID.CREATE_QUESTION); // 스택 등록
        },
        close: () => {
          set({ isOpen: false });
          useModalStackStore.getState().pop(MODAL_ID.CREATE_QUESTION); // 스택 제거
        },
      },
    })),
    { name: 'createQuestionModalStore' },
  ),
);

// 커스텀훅
export const useCreateQuestionModalState = () => {
  const isOpen = useCreateQuestionModalStore((state) => state.isOpen);
  return isOpen;
};

export const useCreateQuestionModalAction = () => {
  const open = useCreateQuestionModalStore((state) => state.actions.open);
  const close = useCreateQuestionModalStore((state) => state.actions.close);

  return { open, close };
};
