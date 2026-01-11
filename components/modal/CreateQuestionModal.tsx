import { X } from 'lucide-react';
import Line from '../common/Line';
import { Input } from '../ui/input/Input';

const CreateQuestionModal = () => {
  return (
    <section className="rounded-[16] bg-white p-9 shadow-md">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text- gray-1000">질문 입력</h2>
        <X className="text-icon-default cursor-pointer" size={24} />
      </div>

      <Line my={4} borderColor="border-gray-300" />

      <article className="flex flex-col gap-4">
        {/* 질문 */}
        <div className="flex flex-col gap-1">
          <span className="flex gap-1 text-sm">
            <p className="text-gray-700">질문</p>
            <p className="text-point-star">*</p>
          </span>
          <Input placeholder="질문을 입력하세요" />
        </div>

        {/* 카테고리 */}

        <div className="flex flex-col gap-1">
          <span className="flex gap-1 text-sm">
            <p className="text-gray-700">카테고리</p>
            <p className="text-point-star">*</p>
          </span>
          <Input placeholder="카테고리를 입력하세요 " />
        </div>

        {/* 태그 */}
        <div className="flex flex-col gap-1">
          <p className="text-sm text-gray-700">태그</p>
          <Input placeholder="태그를 선택하세요" />
        </div>
      </article>
    </section>
  );
};

export default CreateQuestionModal;
