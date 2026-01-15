'use client';
import ButtonGroupField from '../../../../components/common/CreateForm/ButtonGroupField';
import FormItemLayout from '../../../../components/common/CreateForm/FormItemLayout';
import FormSection from '../../../../components/common/CreateForm/FormSection';
import { INTERVIEW_QUESTION_TYPE } from '@/constants/selectOptions';
import TextareaField from '@/components/common/CreateForm/TextareaField';
import DynamicFieldList from '@/components/common/CreateForm/DynamicFieldList';

const Review = () => {
  return (
    <FormSection title="3. 종합 후기" id="review">
      <FormItemLayout
        label="채용과정, 분위기 등 면접에 대한 종합적인 후기를 남겨주세요. "
        isRequired
      >
        <TextareaField
          placeholder={`예: 1차는 역령 면접으로 1:1로 진행되었습니다. 실제 경험을 확인하기 위한 꼬리질문이 많았으며, 자기소개서 위주로 질문이 들어왔습니다.\n2차는 임원 면접이었고 5:3으로 진행되었습니다. 이력서 위주의 질문으로 평이한 수준이었습니다. `}
        />
      </FormItemLayout>

      <FormItemLayout
        label="면접에서 어떤 유형의 질문을 받았습니까? (중복 선택 가능)"
        isRequired
      >
        <ButtonGroupField options={INTERVIEW_QUESTION_TYPE} />
      </FormItemLayout>

      <FormItemLayout label="기억에 남는 면접 질문" isRequired>
        <DynamicFieldList label="질문" placeholder="질문을 입력해주세요" />
      </FormItemLayout>
    </FormSection>
  );
};

export default Review;
