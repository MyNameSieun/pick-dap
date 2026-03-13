'use client';

import { Upload } from 'lucide-react';
import FormSection from '../../../../components/common/CreateForm/FormSection';
import { useReviewStore } from '../../store/reviewStore';
import { uploadProofImage } from '../../util/uploadStorage';

const Proof = () => {
  const { setField, formData } = useReviewStore();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const url = await uploadProofImage(file);

      setField('proof_url', url);

      alert('증빙 자료가 성공적으로 등록되었습니다.');
    } catch (error) {
      console.error(error);
      alert('업로드 중 오류가 발생했습니다.');
    }
  };

  return (
    <FormSection title="6. 면접 참여 증빙" id="proof">
      <div className="flex h-70 flex-col items-center justify-center gap-5 border border-dashed border-gray-400 bg-white p-4">
        {formData.proof_url ? (
          // 이미지가 있을 때: 미리보기와 삭제 버튼
          <div className="group relative flex h-full w-full items-center justify-center">
            <img
              src={formData.proof_url}
              alt="증빙 자료"
              className="max-h-60 rounded-md object-contain"
            />
            <button
              onClick={() => setField('proof_url', '')}
              className="absolute top-2 right-2 rounded-full bg-gray-800/50 p-1 text-white hover:bg-gray-800"
            >
              <span className="px-2 text-xs">다시 올리기</span>
            </button>
          </div>
        ) : (
          // 이미지가 없을 때: 업로드 UI
          <>
            <div className="flex h-16 w-16 items-center justify-center">
              <Upload className="text-icon-default fill-gray-300" size={64} />
            </div>
            <div className="text-center">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
              <label
                htmlFor="file-upload"
                className="text-main-500 h5 cursor-pointer"
              >
                <u>{'첨부하기'}</u>
              </label>
              <div className="b2 mt-3 text-gray-700">
                <p>
                  증빙 자료에는 기업명/연도와 함께 실제 면접 참여 여부를 확인할
                  수 있는 내용이 포함되어야 합니다.
                </p>
                <p>
                  면접 안내 문자/이메일/채용 사이트 내 면접 전형 결과 캡처 사진
                  등
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </FormSection>
  );
};

export default Proof;
