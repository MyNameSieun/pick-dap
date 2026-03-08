'use client';

import SelectCustom from '@/components/common/SelectCustom';
import { Input } from '@/components/ui/input/Input';
import FormItemLayout from '@/components/common/CreateForm/FormItemLayout';
import FormSection from '@/components/common/CreateForm/FormSection';
import TextareaField from '@/components/common/CreateForm/TextareaField';
import { useCreateProjectStore } from '../../store/useCreateProjectStore';
import { ProjectType } from '@/types/entity';

const projectOptions = [
  { label: '개인', value: 'person' },
  { label: '팀', value: 'team' },
];

interface OverviewProps {
  titleRef: React.RefObject<HTMLInputElement | null>;
  descriptionRef: React.RefObject<HTMLInputElement | null>;
  projectTypeRef: React.RefObject<HTMLButtonElement | null>;
  purposeRef: React.RefObject<HTMLTextAreaElement | null>;
}
const Overview = ({
  titleRef,
  descriptionRef,
  projectTypeRef,
  purposeRef,
}: OverviewProps) => {
  const { formData, setField } = useCreateProjectStore();
  return (
    <FormSection title="1. 프로젝트 개요" id="overview">
      <FormItemLayout label="프로젝트명" isRequired>
        <Input
          ref={titleRef}
          value={formData.title}
          onChange={(e) => setField('title', e.target.value)}
          placeholder="프로젝트명"
          className="w-100"
        />
      </FormItemLayout>

      <FormItemLayout label="한 줄 설명" isRequired>
        <Input
          ref={descriptionRef}
          value={formData.description}
          onChange={(e) => setField('description', e.target.value)}
          placeholder="한 줄 설명"
        />
      </FormItemLayout>

      <FormItemLayout label="프로젝트 유형" isRequired>
        <SelectCustom
          ref={projectTypeRef}
          value={formData.project_type}
          onValueChange={(val) => setField('project_type', val as ProjectType)}
          options={projectOptions}
          placeholder="선택하세요"
        />
      </FormItemLayout>

      <FormItemLayout label="진행기간">
        <div className="mt-1 flex w-100 gap-2">
          <div>
            <p className="c1 text-gray-600">시작일</p>
            <Input
              type="date"
              value={formData.start_date}
              onChange={(e) => setField('start_date', e.target.value)}
            />
          </div>
          <div>
            <p className="c1 text-gray-600">종료일</p>
            <Input
              type="date"
              value={formData.end_date}
              onChange={(e) => setField('end_date', e.target.value)}
            />
          </div>
        </div>
      </FormItemLayout>

      <FormItemLayout label="서비스 목적" isRequired>
        <TextareaField
          placeholder="34"
          ref={purposeRef}
          value={formData.service_purpose}
          onChange={(e) => setField('service_purpose', e.target.value)}
        />
      </FormItemLayout>
    </FormSection>
  );
};

Overview.displayName = 'Overview';
export default Overview;
