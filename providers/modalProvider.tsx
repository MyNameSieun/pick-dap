// providers/modalProvider.tsx
import { useEffect } from 'react';
import CreateQuestionModal from '@/components/modal/QuestionEditModal';
import SavedQuestionsModal from '@/components/modal/SavedQuestionsModal';
import { createPortal } from 'react-dom';
import { AlertModal } from '@/components/modal/AlertModal';
import PasswordResetModal from '@/components/modal/PasswordResetModal';
import { useModalStackStore } from '@/store/modal/modalStack';
import { useSaveQuestionModalState } from '@/store/modal/saveQuestionModal';
import { usePasswordResetOpen } from '@/store/modal/passwordResetModal';
import { useQuestionEditModalState } from '@/store/modal/useQuestionEditModal';

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const isCreateOpen = useQuestionEditModalState();
  const isSavedOpen = useSaveQuestionModalState();
  const isPasswordOpen = usePasswordResetOpen();

  // 스택 정보 가져오기 (스크롤 방지용)
  const stackLength = useModalStackStore((state) => state.stack.length);

  // 모달 열릴 때 배경 스크롤 막기 (스택 길이만 감시)
  useEffect(() => {
    document.body.style.overflow = stackLength > 0 ? 'hidden' : 'auto';
  }, [stackLength]);

  return (
    <>
      {children}
      {createPortal(
        <>
          <AlertModal />

          {isCreateOpen && <CreateQuestionModal />}
          {isSavedOpen && <SavedQuestionsModal />}
          {isPasswordOpen && <PasswordResetModal />}
        </>,
        document.getElementById('modal-root')!,
      )}
    </>
  );
};
