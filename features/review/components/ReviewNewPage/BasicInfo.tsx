import { Input } from '@/components/ui/input/Input';
import FormItemLayout from '../../../../components/common/CreateForm/FormItemLayout';
import FormSection from '../../../../components/common/CreateForm/FormSection';
import ButtonGroupField from '../../../../components/common/CreateForm/ButtonGroupField';
import {
  EMPLOYMENT_TYPE_OPTIONS,
  INTERVIEW_PERIOD_OPTIONS,
} from '@/constants/selectOptions';
import SelectCustom from '@/components/common/SelectCustom';
import { jobCategories } from '@/constants/jobCategories';

const BasicInfo = () => {
  return (
    <FormSection title="1. 기본정보" id="basic-info">
      <FormItemLayout label="회사명" isRequired>
        <Input placeholder="회사명" className="w-100" />
      </FormItemLayout>

      <FormItemLayout label="직무" isRequired>
        <SelectCustom
          options={jobCategories.map((jobCategory) => ({
            label: jobCategory,
            value: jobCategory,
          }))}
          placeholder="직무를 선택하세요"
        />
      </FormItemLayout>

      <FormItemLayout label="면접일" isRequired>
        <SelectCustom
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
