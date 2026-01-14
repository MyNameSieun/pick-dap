import BackButton from '@/components/common/BackButton';
import { Input } from '@/components/ui/input/Input';

const CommunityCreate = () => {
  return (
    <>
      <div className="mb-[-12px]">
        <BackButton label={<p className="font-bold">뒤로가기</p>} />
      </div>

      <div className="h-9 w-40">게시판 선택</div>
      <Input
        placeholder="제목을 입력하세요..."
        className="h-10"
        variant="ghost"
      />
    </>
  );
};
export default CommunityCreate;
