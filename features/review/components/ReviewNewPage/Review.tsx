import { Textarea } from '@/components/ui/textarea/Textarea';
import ButtonGroupField from './ButtonGroupField';
import FormItemLayout from './FormItemLayout';
import FormSection from './FormSection';
import { INTERVIEW_QUESTION_TYPE } from '@/constants/selectOptions';
import { Plus } from 'lucide-react';

const Review = () => {
  return (
    <FormSection title="3. 종합 후기" id="review">
      <FormItemLayout
        label="채용과정, 분위기 등 면접에 대한 종합적인 후기를 남겨주세요. "
        isRequired
      >
        <div className="relative">
          <Textarea
            placeholder={`예: 1차는 역령 면접으로 1:1로 진행되었습니다. 실제 경험을 확인하기 위한 꼬리질문이 많았으며, 자기소개서 위주로 질문이 들어왔습니다.\n2차는 임원 면접이었고 5:3으로 진행되었습니다. 이력서 위주의 질문으로 평이한 수준이었습니다. `}
          />
          <p className="c1 absolute right-0 mt-2 text-gray-600">
            {Textarea.length}/최소 20자
          </p>
        </div>
      </FormItemLayout>

      <FormItemLayout
        label="면접에서 어떤 유형의 질문을 받았습니까? (중복 선택 가능)"
        isRequired
      >
        <ButtonGroupField options={INTERVIEW_QUESTION_TYPE} />
      </FormItemLayout>

      <FormItemLayout label="기억에 남는 면접 질문" isRequired>
        <div className="relative rounded-sm border border-gray-300 p-3">
          {/* 질문 1 */}
          <div className="flex flex-col gap-3">
            <button className="text-point-heart b2 absolute top-2.5 right-3 cursor-pointer">
              삭제
            </button>
            <FormItemLayout label="질문1" className="b1 font-bold">
              <Textarea />
            </FormItemLayout>
          </div>
        </div>

        <button className="mt-4 flex cursor-pointer items-center justify-center gap-2 rounded-sm border-4 border-dotted bg-gray-100 p-5">
          <Plus size={15} className="text-icon-default" />
          <div className="text-gray-800">질문 추가</div>
        </button>
      </FormItemLayout>
    </FormSection>
  );
};

export default Review;
