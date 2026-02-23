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

  const stackLength = useModalStackStore((state) => state.stack.length);

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
