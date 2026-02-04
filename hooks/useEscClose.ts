// hooks/useEscClose.ts
import { useModalStackAction } from '@/store/modal/modalStack';
import { useEffect } from 'react';

export const useEscClose = (
  name: string,
  isOpen: boolean,
  onClose: () => void,
) => {
  const { isTop } = useModalStackAction();

  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e: KeyboardEvent) => {
      // 내가 스택의 최상단(isTop)일 때만 onClose 실행
      if (e.key === 'Escape' && isTop(name)) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, name, isTop, onClose]);
};
