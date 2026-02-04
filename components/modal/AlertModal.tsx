// components/modal/AlertModal.tsx
import { useAlertModal } from '@/store/modal/alertModal';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import { useEscClose } from '@/hooks/useEscClose';

export const AlertModal = () => {
  const store = useAlertModal(); // 커스텀 훅 호출
  useEscClose('AlertModal', store.isOpen, store.actions.close);

  if (!store.isOpen) return null;

  const handleCancelClick = () => {
    if (store.onNegative) store.onNegative(); // 콜백 실행
    store.actions.close();
  };

  const hanldeActionClick = () => {
    if (store.onPositive) store.onPositive(); // 콜백 실행 (PostModal 닫기 등)
    store.actions.close();
  };

  return (
    <AlertDialog open={store.isOpen}>
      <AlertDialogOverlay className="modal-layout z-[110]" />
      <AlertDialogContent className="z-[120]">
        <AlertDialogHeader>
          <AlertDialogTitle>{store.title}</AlertDialogTitle>
          <AlertDialogDescription>{store.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancelClick}>
            취소
          </AlertDialogCancel>
          <AlertDialogAction onClick={hanldeActionClick}>
            확인
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
