import { create } from 'zustand';
import { combine, devtools } from 'zustand/middleware';
import { useModalStackStore } from './modalStack';
import { MODAL_ID } from '@/constants/modalNames';
import { CategoryTypeEnums } from '@/types/entity';

type CreateMode = {
  isOpen: true;
  type: 'CREATE';
};

type EditMode = {
  isOpen: true;
  type: 'EDIT';
  questionId: string;
  title: string;
  category: CategoryTypeEnums;
  tagList: string[];
};

type OpenState = CreateMode | EditMode;

type CloseState = {
  isOpen: false;
};

type State = OpenState | CloseState;

const initialState = {
  isOpen: false,
} as State;

export const useQuestionEditModalStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        openCreate: () => {
          set({ type: 'CREATE', isOpen: true });
          useModalStackStore.getState().push(MODAL_ID.CREATE_QUESTION); // 스택 등록
        },
        openEdit: (param: Omit<EditMode, 'isOpen' | 'type'>) => {
          set({ type: 'EDIT', isOpen: true, ...param });
          useModalStackStore.getState().push(MODAL_ID.CREATE_QUESTION); // 스택 등록
        },
        close: () => {
          set({ isOpen: false });
          useModalStackStore.getState().pop(MODAL_ID.CREATE_QUESTION); // 스택 제거
        },
      },
    })),
    { name: 'questionEditModal' },
  ),
);

// 커스텀훅
export const useQuestionEditModalState = () => {
  const isOpen = useQuestionEditModalStore((state) => state.isOpen);
  return isOpen;
};

export const useQuestionEditModalAction = () => {
  const openCreate = useQuestionEditModalStore(
    (state) => state.actions.openCreate,
  );
  const openEdit = useQuestionEditModalStore((state) => state.actions.openEdit);
  const close = useQuestionEditModalStore((state) => state.actions.close);

  return { openCreate, openEdit, close };
};

export const useQuestionEditModal = () => {
  // store에 state 값은 포함되지 않음
  // 이는 state 타입이 유니온(|) 으로 정의되어 있어 combine은 안전히 타입 추론하기 위해 state 타입 미포함 (잘못추론)
  // 따라서 타입 단언문 사용해야함
  const state = useQuestionEditModalStore((state) => state);
  // combine 미들웨어 특성상 state와 actions가 합쳐진 타입을 보장하기 위해 단언 사용
  return state as typeof state & State;
};
