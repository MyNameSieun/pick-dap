// hooks/useConfirmCloseModal.ts
import { useOpenAlertModal } from '@/store/modal/alertModal';

export const useConfirmCloseModal = () => {
  const openAlertModal = useOpenAlertModal();

  const handleConfirmClose = (content: string, close: () => void) => {
    // 내용이 있는 경우 경고
    if (content.trim() !== '') {
      openAlertModal({
        title: '작성 중인 내용이 있습니다',
        description: '정말 나가시겠습니까? 작성 중인 내용은 저장되지 않습니다.',
        onPositive: close,
      });
      return;
    }

    close();
  };
  return { handleConfirmClose };
};
