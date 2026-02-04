import { create } from 'zustand';
import { combine, devtools } from 'zustand/middleware';
import { useModalStackStore } from './modalStack';
import { MODAL_ID } from '@/constants/modalNames';

const initialState = {
  isOpen: false,
  email: '',
};

export const usePasswordResetModalStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        open: () => {
          set({ isOpen: true });
          useModalStackStore.getState().push(MODAL_ID.PASSWORD_RESET);
        },
        close: () => {
          set({ isOpen: false });
          useModalStackStore.getState().pop(MODAL_ID.PASSWORD_RESET);
        },
        setEmail: (email: string) => set({ email }),
        resetEmail: () => set({ email: '' }),
      },
    })),
    { name: 'passwordResetModalStore' },
  ),
);

// 커스텀
export const usePasswordResetOpen = () =>
  usePasswordResetModalStore((state) => state.isOpen);

export const usePasswordResetEmail = () =>
  usePasswordResetModalStore((state) => state.email);

export const usePasswordResetModalActions = () =>
  usePasswordResetModalStore((state) => state.actions);
