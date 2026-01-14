import { INTERVIEW_TIME, PASS_STATUS_OPTIONS } from '@/constants/selectOptions';
import ButtonGroupField from './ButtonGroupField';
import FormItemLayout from './FormItemLayout';
import FormSection from './FormSection';

const Result = () => {
  return (
    <FormSection title="5. 결과 정보" id="result">
      <FormItemLayout label="결과 발표까지 소요된 시간은?">
        <ButtonGroupField options={INTERVIEW_TIME} />
      </FormItemLayout>

      <FormItemLayout label="최종 합격 여부 ">
        <ButtonGroupField options={PASS_STATUS_OPTIONS} />
      </FormItemLayout>
    </FormSection>
  );
};

export default Result;
