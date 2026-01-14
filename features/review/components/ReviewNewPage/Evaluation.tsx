import { Slider } from '@/components/ui/Slider';
import ButtonGroupField from './ButtonGroupField';
import FormItemLayout from './FormItemLayout';
import FormSection from './FormSection';
import {
  INTERVIEW_LEVEL,
  INTERVIEW_PERSONNEL,
  INTERVIEW_TYPE_OPTIONS,
} from '@/constants/selectOptions';

const Evaluation = () => {
  return (
    <FormSection title="2. 면접 평가" id="evaluation">
      <FormItemLayout label="전반적인 면접장 및 면접관 분위기는?" isRequired>
        <div className="c1 flex w-[80%] justify-between gap-3 py-8 text-gray-600">
          <p>편안</p>
          <div className="flex flex-1 flex-col">
            <Slider defaultValue={[50]} max={100} step={25} />
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
        <ButtonGroupField options={INTERVIEW_LEVEL} />
      </FormItemLayout>

      <FormItemLayout
        label="응시한 면접 전형에 체크하세요. (중복 선택 가능)"
        isRequired
      >
        <ButtonGroupField options={INTERVIEW_TYPE_OPTIONS} />
      </FormItemLayout>

      <FormItemLayout label="면접 인원" isRequired>
        <ButtonGroupField options={INTERVIEW_PERSONNEL} />
      </FormItemLayout>
    </FormSection>
  );
};

export default Evaluation;
