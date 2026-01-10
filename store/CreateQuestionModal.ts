import { create } from 'zustand';
import { combine, devtools } from 'zustand/middleware';

const initialState = {
  isOpen: false,
};
export const useCreateQuestionModalStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        open: () => {
          set({ isOpen: true });
        },
        close: () => {
          set({ isOpen: false });
        },
      },
    })),
    { name: 'postEditorModalStore' },
  ),
);

// 커스텀 훅
export const useOpenPostEditorModal = () => {
  const open = useCreateQuestionModalStore((store) => store.actions.open);
  return open;
};

export const usePostEditorModal = () => {
  const {
    isOpen,
    actions: { open, close },
  } = useCreateQuestionModalStore();
  return { isOpen, open, close };
};
