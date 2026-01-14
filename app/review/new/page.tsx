import BackButton from '@/components/common/BackButton';
import EmptyStateBox from '@/components/common/EmptyStateBox/EmptyStateBox';
import FormSelect from '@/components/common/FormSelect';
import HeaderTitleBox from '@/components/common/HeaderTitleBox';
import Line from '@/components/common/Line';
import RequiredMark from '@/components/common/RequiredMark';
import { Button } from '@/components/ui/button/Button';
import { Input } from '@/components/ui/input/Input';
import { Slider } from '@/components/ui/Slider';
import { Textarea } from '@/components/ui/textarea/Textarea';
import {
  EMPLOYMENT_TYPE_OPTIONS,
  INTERVIEW_LEVEL,
  INTERVIEW_PERIOD_OPTIONS,
  INTERVIEW_PERSONNEL,
  INTERVIEW_QUESTION_TYPE,
  INTERVIEW_TIME,
  INTERVIEW_TYPE_OPTIONS,
  PASS_STATUS_OPTIONS,
} from '@/constants/selectOptions';
import ButtonGroupField from '@/features/review/components/ButtonGroupField';
import FormItemLayout from '@/features/review/components/FormItemLayout';
import FormSection from '@/features/review/components/FormSection';
import { Pen, Plus, Upload } from 'lucide-react';

const CONTENTS = [
  '기본 정보',
  '면접 평가',
  '종합 후기',
  '면접 팁',
  '결과 정보',
  '결과 정보',
  '면접 참여 증빙',
  '개선점/회고',
];

const ReviewNewPage = () => {
  return (
    <main>
      <header>
        <BackButton label="목록으로 돌아가기" />

        <HeaderTitleBox
          title="면접 후기 작성"
          content="실제 면접 경험을 공유해주세요"
          icon={Pen}
        />

        <Line />
      </header>

      <aside className="bg-bg-deep w-fit border-r-2 border-amber-300">
        <h4 className="h4">목차</h4>

        <ol>
          {CONTENTS.map((content, index) => (
            <li key={index}>
              {index + 1}. {content}
            </li>
          ))}
        </ol>
      </aside>

      {/* 1. 기본 정보 */}
      <FormSection title="1. 기본정보">
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

      {/* 2. 면접 평가 */}
      <FormSection title="2. 면접 평가">
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

      {/* 3. 종합 후기 */}
      <FormSection title="3. 종합 후기">
        <FormItemLayout
          label="채용과정, 분위기 등 면접에 대한 종합적인 후기를 남겨주세요. "
          isRequired
        >
          <div className="relative">
            <Textarea
              placeholder={`예: 1차는 역령 면접으로 1:1로 진행되었습니다. 실제 경험을 확인하기 위한 꼬리질문이 많았으며, 자기소개서 위주로 질문이 들어왔습니다.\n2차는 임원 면접이었고 5:3으로 진행되었습니다. 이력서 위주의 질문으로 평이한 수준이었습니다. `}
            />
            <p className="c1 absolute right-0 mt-2 text-gray-600">
              {Textarea.length}/최소 20자
            </p>
          </div>
        </FormItemLayout>

        <FormItemLayout
          label="면접에서 어떤 유형의 질문을 받았습니까? (중복 선택 가능)"
          isRequired
        >
          <ButtonGroupField options={INTERVIEW_QUESTION_TYPE} />
        </FormItemLayout>

        <FormItemLayout label="기억에 남는 면접 질문" isRequired>
          <div className="relative rounded-sm border border-gray-300 p-3">
            {/* 질문 1 */}
            <div className="flex flex-col gap-3">
              <button className="text-point-heart b2 absolute top-2.5 right-3 cursor-pointer">
                삭제
              </button>
              <FormItemLayout label="질문1" className="b1 font-bold">
                <Textarea />
              </FormItemLayout>
            </div>
          </div>

          <button className="mt-4 flex cursor-pointer items-center justify-center gap-2 rounded-sm border-4 border-dotted bg-gray-100 p-5">
            <Plus size={15} className="text-icon-default" />
            <div className="text-gray-800">질문 추가</div>
          </button>
        </FormItemLayout>
      </FormSection>

      {/* 4. 면접 팁 */}
      <FormSection title="4. 면접 팁">
        <FormItemLayout label="면접 답변 혹은 전반적인 면접 TIP을 남겨주세요.">
          <div className="relative">
            <Textarea
              placeholder={`예: 회사 직무에 대한 이해가 중요합니다. 직무 관련 경험, 지식을 많이 보는 것 같고 프로젝트나 인턴 경험이 있으시다면 구체적으로 어떤 활동을 했는지 어필하는 것이 좋을듯 합니다.  `}
            />
            <p className="c1 absolute right-0 mt-2 text-gray-600">
              {Textarea.length}/최소 20자
            </p>
          </div>
        </FormItemLayout>
      </FormSection>

      {/* 5. 결과 정보 */}
      <FormSection title="5. 결과 정보">
        <FormItemLayout label="결과 발표까지 소요된 시간은?">
          <ButtonGroupField options={INTERVIEW_TIME} />
        </FormItemLayout>

        <FormItemLayout label="최종 합격 여부 ">
          <ButtonGroupField options={PASS_STATUS_OPTIONS} />
        </FormItemLayout>
      </FormSection>

      {/* 6. 면접 참여 증빙 */}
      <FormSection title="6. 면접 참여 증빙">
        <div className="flex h-70 flex-col items-center justify-center gap-5 border border-dashed border-gray-400 bg-white">
          <div className="h-16 w-16 items-center justify-center">
            <Upload className="text-icon-default fill-gray-300" size={64} />
          </div>

          <div className="text-center">
            <input type="file" id="file-upload" className="hidden" />

            <label
              htmlFor="file-upload"
              className="text-main-500 h5 cursor-pointer"
            >
              <u>{'첨부하기'}</u>
            </label>

            <div className="b2 mt-3 text-gray-700">
              <p>
                증빙 자료에는 기업명/연도와 함께 실제 면접 참여 여부를 확인할 수
                있는 내용이 포함되어야 합니다.
              </p>
              <p>
                면접 안내 문자/이메일/채용 사이트 내 면접 전형 결과 캡처 사진 등
              </p>
            </div>
          </div>
        </div>
      </FormSection>
    </main>
  );
};

export default ReviewNewPage;
