import { KeyRound, X } from 'lucide-react';
import HeaderTitleBox from '../common/HeaderTitleBox';
import { Input } from '../ui/input/Input';
import { Button } from '../ui/button/Button';
import { useEscClose } from '@/hooks/useEscClose';
import { MODAL_ID } from '@/constants/modalNames';
import {
  usePasswordResetEmail,
  usePasswordResetModalActions,
  usePasswordResetOpen,
} from '@/store/modal/passwordResetModal';

const PasswordResetModal = () => {
  const isOpen = usePasswordResetOpen();
  const { open, close, resetEmail, setEmail } = usePasswordResetModalActions();
  const email = usePasswordResetEmail();

  useEscClose(MODAL_ID.PASSWORD_RESET, isOpen, close);

  return (
    <div onClick={close} className="modal-layout">
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-148 rounded-b-[24px] shadow-md"
      >
        <div className="bg-main-400 flex w-full gap-4 rounded-t-[24px] px-9 pt-9">
          <HeaderTitleBox icon={KeyRound} />
          <div className="flex flex-1 flex-col justify-between text-white">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <h3 className="text-white">비밀번호 재설정</h3>
                <X onClick={close} className="cursor-pointer" size={24} />
              </div>

              <p className="b2">
                본인 확인을 위해 가입한 이메일 주소가 필요합니다.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center bg-white py-10 text-gray-700">
          <h6>가입시 등록했던 이메일을 입력해주세요. </h6>
          <h6> 이메일 주소로 임시 비밀번호를 보내드릴게요.</h6>
        </div>

        <div className="flex flex-col gap-12.5 rounded-b-[24px] bg-white px-10">
          <Input
            inputSize="lg"
            placeholder="아이디 (이메일)"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />

          <div className="mb-10 flex gap-2">
            <Button onClick={close} className="flex-1" variant={'white'}>
              <h6>취소</h6>
            </Button>
            <Button className="flex-1" variant={'default'}>
              <h6>전송하기</h6>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetModal;
