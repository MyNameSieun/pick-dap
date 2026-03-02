'use client';

import {
  PASS_STATUS_OPTIONS,
  RESULT_WAIT_TIME,
} from '@/constants/selectOptions';
import ButtonGroupField from '../../../../components/common/CreateForm/ButtonGroupField';
import FormItemLayout from '../../../../components/common/CreateForm/FormItemLayout';
import FormSection from '../../../../components/common/CreateForm/FormSection';
import { useReviewStore } from '../../store/reviewStore';

const Result = () => {
  const { formData, setField } = useReviewStore();

  return (
    <FormSection title="5. 결과 정보" id="result">
      <FormItemLayout label="결과 발표까지 소요된 시간은?">
        <ButtonGroupField
          value={formData.result_wait_time_type}
          onValueChange={(val) => setField('result_wait_time_type', val)}
          options={RESULT_WAIT_TIME}
        />
      </FormItemLayout>

      <FormItemLayout label="최종 합격 여부 ">
        <ButtonGroupField
          value={formData.final_status_type}
          onValueChange={(val) => setField('final_status_type', val)}
          options={PASS_STATUS_OPTIONS}
        />
      </FormItemLayout>
    </FormSection>
  );
};

export default Result;
