import { KeyRound, X } from 'lucide-react';
import HeaderTitleBox from '../common/HeaderTitleBox';
import { Input } from '../ui/input/Input';
import { Button } from '../ui/button/Button';

const PasswordResetModal = () => {
  return (
    <>
      <div className="mx-auto w-148 rounded-b-[24] bg-white shadow-md">
        <div className="bg-main-400 flex gap-4 rounded-t-[24] p-9">
          <HeaderTitleBox icon={KeyRound} />
          <div className="flex flex-col justify-around text-white">
            <h3 className="text-white">비밀번호 재설정</h3>

            <p className="b2">
              본인 확인을 위해 가입한 이메일 주소가 필요합니다.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center py-10 text-gray-700">
          <h6>가입시 등록했던 이메일을 입력해주세요. </h6>
          <h6> 이메일 주소로 임시 비밀번호를 보내드릴게요.</h6>
        </div>

        <div className="mx-10 flex flex-col gap-12.5">
          <Input inputSize="lg" placeholder="아이디 (이메일)" type="email" />

          <div className="mb-10 flex gap-2">
            <Button className="flex-1" variant={'white'}>
              <h6>취소</h6>
            </Button>
            <Button className="flex-1" variant={'default'}>
              <h6>전송하기</h6>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordResetModal;
