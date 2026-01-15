import { Upload } from 'lucide-react';
import FormSection from '../../../../components/common/CreateForm/FormSection';

const Proof = () => {
  return (
    <FormSection title="6. 면접 참여 증빙" id="proof">
      <div className="flex h-70 flex-col items-center justify-center gap-5 border border-dashed border-gray-400 bg-white">
        <div className="h-16 w-16 items-center justify-center">
          <Upload className="text-icon-default fill-gray-300" size={64} />
        </div>

        <div className="text-center">
          <input type="file" id="file-upload" className="hidden" />

          <label
            htmlFor="file-upload"
            className="text-main-500 h5 cursor-pointer"
          >
            <u>{'첨부하기'}</u>
          </label>

          <div className="b2 mt-3 text-gray-700">
            <p>
              증빙 자료에는 기업명/연도와 함께 실제 면접 참여 여부를 확인할 수
              있는 내용이 포함되어야 합니다.
            </p>
            <p>
              면접 안내 문자/이메일/채용 사이트 내 면접 전형 결과 캡처 사진 등
            </p>
          </div>
        </div>
      </div>
    </FormSection>
  );
};

export default Proof;
