import { Input } from '@/components/ui/input/Input';
import FormItemLayout from './FormItemLayout';
import FormSection from './FormSection';
import FormSelect from '@/components/common/FormSelect';
import ButtonGroupField from './ButtonGroupField';
import {
  EMPLOYMENT_TYPE_OPTIONS,
  INTERVIEW_PERIOD_OPTIONS,
} from '@/constants/selectOptions';

const BasicInfo = () => {
  return (
    <FormSection title="1. 기본정보" id="basic-info">
      <FormItemLayout label="회사명" isRequired>
        <Input placeholder="회사명" />
      </FormItemLayout>

      <FormItemLayout label="직무" isRequired>
        <Input placeholder="직무" />
      </FormItemLayout>

      <FormItemLayout label="면접일" isRequired>
        <FormSelect
          options={INTERVIEW_PERIOD_OPTIONS}
          placeholder="면접일을 선택해주세요"
          className="w-60"
        />
      </FormItemLayout>

      <FormItemLayout label="지원유형" isRequired>
        <ButtonGroupField options={EMPLOYMENT_TYPE_OPTIONS} />
      </FormItemLayout>
    </FormSection>
  );
};

export default BasicInfo;
