import { create } from 'zustand';
import { combine, devtools } from 'zustand/middleware';
import { useModalStackStore } from './modalStack';
import { MODAL_ID } from '@/constants/modalNames';

const initialState = {
  isOpen: false,
};

export const useSaveQuestionModalStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        open: () => {
          set({ isOpen: true });
          useModalStackStore.getState().push(MODAL_ID.SAVE_QUESTION);
        },
        close: () => {
          set({ isOpen: false });
          useModalStackStore.getState().pop(MODAL_ID.SAVE_QUESTION);
        },
      },
    })),
    { name: 'saveQuesionModalStore' },
  ),
);

// 커스텀훅
export const useSaveQuestionModalState = () =>
  useSaveQuestionModalStore((state) => state.isOpen);

export const useSaveQuestionModalAction = () =>
  useSaveQuestionModalStore((state) => state.actions);
