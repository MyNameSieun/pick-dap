// store/modalStack.ts
import { create } from 'zustand';

interface ModalStackState {
  stack: string[]; // 현재 열려있는 모달들의 이름(ID)를 순서대로 저장하는 배열
  push: (name: string) => void; // 모달이 열릴 때 -> 스택에 추가
  pop: (name: string) => void; // 모달이 닫힐 때 -> 스택에 뺌
  isTop: (name: string) => boolean; // 특정 모달이 최상단인지 확인
}
const initialState = {
  stack: [],
};
export const useModalStackStore = create<ModalStackState>((set, get) => ({
  ...initialState,

  push: (name) =>
    set((state) => ({
      // 이미 스택에 이름이 있다면 그대로 두고, 없다면 배열 끝에 새로 추가
      stack: state.stack.includes(name) ? state.stack : [...state.stack, name],
    })),

  pop: (name) =>
    set((state) => ({
      // 닫으려는 모달의 이름과 일치하지 않는 것들만 필터링
      stack: state.stack.filter((n) => n !== name),
    })),
  isTop: (name) => {
    const { stack } = get();
    // 배열의 마지막 원소(가장 최근에 추가된 것)가 인자로 받은 이름과 같은지 비교
    return stack[stack.length - 1] === name;
  },
}));

// 커스텀훅
export const useModalStack = () => {
  return useModalStackStore((state) => state.stack);
};

export const useModalStackAction = () => {
  const push = useModalStackStore((state) => state.push);
  const pop = useModalStackStore((state) => state.pop);
  const isTop = useModalStackStore((state) => state.isTop);

  return { push, pop, isTop };
};
