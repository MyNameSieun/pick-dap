// store/alertModal.ts
import { create } from 'zustand';
import { combine, devtools } from 'zustand/middleware';
import { useModalStackStore } from './modalStack';
import { MODAL_ID } from '@/constants/modalNames';

interface OpenState {
  isOpen: true;
  // alert 모달에 필요한 추가 데이터
  title: string;
  description: string;
  onPositive?: () => void; // 긍정적인 버튼(확인) 클릭 시 호출할 콜백 함수
  onNegative?: () => void; // 부정적인 버튼(취소) 클릭 시 호출할 콜백 함수
}

interface CloseState {
  isOpen: false;
}

type State = CloseState | OpenState;

const initialState = {
  isOpen: false,
} as State; // 타입 단언

const useAlertModalStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        open: (params: Omit<OpenState, 'isOpen'>) => {
          set({ ...params, isOpen: true });
          useModalStackStore.getState().push(MODAL_ID.ALERT);
        },
        close: () => {
          set({ isOpen: false });
          useModalStackStore.getState().pop(MODAL_ID.ALERT);
        },
      },
    })),
    { name: 'alertModalStore' },
  ),
);

// 커스텀 훅
export const useOpenAlertModal = () => {
  const open = useAlertModalStore((store) => store.actions.open);
  return open;
};

export const useAlertModal = () => {
  const store = useAlertModalStore();
  return store as typeof store & State;
};
