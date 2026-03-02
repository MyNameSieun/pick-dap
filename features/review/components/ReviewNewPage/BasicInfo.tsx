'use client';

import { Input } from '@/components/ui/input/Input';
import FormItemLayout from '../../../../components/common/CreateForm/FormItemLayout';
import FormSection from '../../../../components/common/CreateForm/FormSection';
import ButtonGroupField from '../../../../components/common/CreateForm/ButtonGroupField';

import SelectCustom from '@/components/common/SelectCustom';
import { useReviewStore } from '../../store/reviewStore';
import {
  EMPLOYMENT_TYPE_OPTIONS,
  SEASON_OPTIONS,
} from '@/constants/selectOptions';
import { useFetchJobRoleData } from '../../hooks/useFetchJobRoleData';
import Loader from '@/components/ui/Loader';

const BasicInfo = () => {
  const { formData, setField } = useReviewStore();

  const { data: jobRolesData, isPending: isJobRolesData } =
    useFetchJobRoleData();

  const selectedValue =
    formData.interview_year && formData.interview_season
      ? `${formData.interview_year} ${formData.interview_season}`
      : undefined;

  const handleDateChange = (date: string) => {
    const [year, season] = date.split(' ');

    setField('interview_year', Number(year));
    setField('interview_season', season);
  };

  if (isJobRolesData) return <Loader />;
  return (
    <FormSection title="1. 기본정보" id="basic-info">
      <FormItemLayout label="회사명" isRequired>
        <Input
          placeholder="회사명"
          className="w-100"
          value={formData.company_name}
          onChange={(e) => setField('company_name', e.target.value)}
        />
      </FormItemLayout>

      <FormItemLayout label="직무" isRequired>
        <SelectCustom
          options={
            jobRolesData?.map((j) => ({
              label: j.name,
              value: j.id,
            })) ?? []
          }
          placeholder="직무를 선택하세요"
          value={formData.job_role_id}
          onValueChange={(value) => setField('job_role_id', value)}
        />
      </FormItemLayout>

      <FormItemLayout label="면접일" isRequired>
        <SelectCustom
          className="w-60"
          placeholder="면접일을 선택하세요"
          options={SEASON_OPTIONS}
          value={selectedValue}
          onValueChange={handleDateChange}
        />
      </FormItemLayout>

      <FormItemLayout label="지원유형" isRequired>
        <ButtonGroupField
          options={EMPLOYMENT_TYPE_OPTIONS}
          value={formData.employment_type}
          onValueChange={(value) => setField('employment_type', value)}
        />
      </FormItemLayout>
    </FormSection>
  );
};

export default BasicInfo;
