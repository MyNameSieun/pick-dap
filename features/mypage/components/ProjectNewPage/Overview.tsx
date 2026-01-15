import SelectCustom from '@/components/common/SelectCustom';
import { Input } from '@/components/ui/input/Input';
import { Textarea } from '@/components/ui/textarea/Textarea';
import FormItemLayout from '@/components/common/CreateForm/FormItemLayout';
import FormSection from '@/components/common/CreateForm/FormSection';
import TextareaField from '@/components/common/CreateForm/TextareaField';

const projectOptions = [
  {
    label: '개인',
    value: '개인',
  },
  {
    label: '팀',
    value: '팀',
  },
];

const Overview = () => {
  return (
    <FormSection title="1. 프로젝트 개요" id="basic-info">
      <FormItemLayout label="프로젝트명" isRequired>
        <Input placeholder="프로젝트명" className="w-100" />
      </FormItemLayout>

      <FormItemLayout label="한 줄 설명" isRequired>
        <Input placeholder="한 줄 설명" />
      </FormItemLayout>

      <FormItemLayout label="프로젝트 유형" isRequired>
        <SelectCustom options={projectOptions} placeholder="선택하세요" />
      </FormItemLayout>

      <FormItemLayout label="진행기간">
        <div className="mt-1 flex w-100 gap-2">
          <div>
            <p className="c1 text-gray-600">시작일</p>
            <Input type="date" />
          </div>
          <div>
            <p className="c1 text-gray-600">종료일</p>
            <Input type="date" />
          </div>
        </div>
      </FormItemLayout>

      <FormItemLayout label="서비스 목적" isRequired>
        <TextareaField placeholder="34" />
      </FormItemLayout>
    </FormSection>
  );
};

export default Overview;
