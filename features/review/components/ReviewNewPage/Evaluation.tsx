'use client';

import { Slider } from '@/components/ui/Slider';
import ButtonGroupField from '../../../../components/common/CreateForm/ButtonGroupField';
import FormItemLayout from '../../../../components/common/CreateForm/FormItemLayout';
import FormSection from '../../../../components/common/CreateForm/FormSection';
import {
  INTERVIEW_LEVEL,
  INTERVIEW_PERSONNEL,
} from '@/constants/selectOptions';
import { useFetchInterviewProcessData } from '../../hooks/useFetchInterviewProcessData';
import { useReviewStore } from '../../store/reviewStore';
import Loader from '@/components/ui/Loader';

const Evaluation = () => {
  const { formData, setField, toggleId } = useReviewStore();

  const { data: interviewProcesses = [], isPending } =
    useFetchInterviewProcessData();
  if (isPending) return <Loader />;

  const PROCESS_OPTIONS = interviewProcesses.map((process) => ({
    label: process.name,
    value: process.id,
  }));

  const handleSliderChange = (val: number[]) => {
    const score = val[0] / 25 + 1;
    setField('atmosphere_score', score);
  };
  return (
    <FormSection title="2. 면접 평가" id="evaluation">
      <FormItemLayout label="전반적인 면접장 및 면접관 분위기는?" isRequired>
        <div className="c1 flex w-[80%] justify-between gap-3 py-8 text-gray-600">
          <p>편안</p>
          <div className="flex flex-1 flex-col">
            <Slider
              value={[(formData.atmosphere_score - 1) * 25]}
              onValueChange={handleSliderChange}
              max={100}
              step={25}
            />
            <div className="mt-3 flex justify-between px-1 text-xs text-gray-400">
              <span>1단계</span>
              <span>2단계</span>
              <span>3단계</span>
              <span>4단계</span>
              <span>5단계</span>
            </div>
          </div>
          <p>경직</p>
        </div>
      </FormItemLayout>

      <FormItemLayout label="전반적인 면접 난이도" isRequired>
        <ButtonGroupField
          options={INTERVIEW_LEVEL}
          value={formData.difficulty}
          onValueChange={(val) => setField('difficulty', val)}
        />
      </FormItemLayout>

      <FormItemLayout
        label="응시한 면접 전형에 체크하세요. (중복 선택 가능)"
        isRequired
      >
        <ButtonGroupField
          options={PROCESS_OPTIONS}
          value={formData.processIds}
          onValueChange={(val) => toggleId('processIds', val)}
        />
      </FormItemLayout>

      <FormItemLayout label="면접 인원" isRequired>
        <ButtonGroupField
          options={INTERVIEW_PERSONNEL}
          value={formData.interview_personnel_type}
          onValueChange={(val) => setField('interview_personnel_type', val)}
        />
      </FormItemLayout>
    </FormSection>
  );
};

export default Evaluation;
