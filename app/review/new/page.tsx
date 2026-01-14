import BackButton from '@/components/common/BackButton';
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
  INTERVIEW_TYPE_OPTIONS,
} from '@/constants/selectOptions';
import { Pen, Section } from 'lucide-react';

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
      <section className="flex flex-col gap-5">
        <h3 className="h3 mb-3">1. 기본정보</h3>

        <article className="flex flex-col gap-1">
          <p className="b2 text-gray-700">
            회사명 <RequiredMark />
          </p>
          <Input placeholder="회사명" type="text" required />
        </article>

        <article className="flex flex-col gap-1">
          <p className="b2 text-gray-700">
            직무 <RequiredMark />
          </p>
          <Input placeholder="직무" type="text" required />
        </article>

        <article className="flex flex-col gap-1">
          <p className="b2 text-gray-700">
            면접일 <RequiredMark />
          </p>

          <FormSelect
            options={INTERVIEW_PERIOD_OPTIONS}
            placeholder="면접일을 선택해주세요"
            className="w-60"
          />
        </article>

        <article className="flex flex-col gap-1">
          <p className="b2 text-gray-700">지원유형</p>
          <div className="flex gap-1">
            {EMPLOYMENT_TYPE_OPTIONS.map(({ label, value }) => (
              <Button key={label} className="px-7" variant={'white'}>
                {value}
              </Button>
            ))}
          </div>
        </article>
      </section>

      <Line my={12} />

      {/* 2. 면접 평가 */}
      <section className="flex flex-col gap-5">
        <h3 className="h3 mb-3">2. 면접 평가</h3>
        <article className="flex w-[80%] flex-col gap-1">
          <p className="text-gray-700">전반적인 면접장 및 면접관 분위기는?</p>
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
        </article>

        <article className="flex flex-col gap-1">
          <p className="mb-3 text-gray-700">전반적인 면접 난이도</p>
          <div className="flex gap-1">
            {INTERVIEW_LEVEL.map((level) => (
              <Button key={level} className="px-7" variant={'white'}>
                {level}
              </Button>
            ))}
          </div>
        </article>

        <article className="flex flex-col gap-1">
          <p className="mb-3 text-gray-700">
            응시한 면접 전형에 체크하세요. (중복 선택 가능)
          </p>
          <div className="flex gap-1">
            {INTERVIEW_TYPE_OPTIONS.map(({ label, value }) => (
              <Button key={label} className="px-7" variant={'white'}>
                {value}
              </Button>
            ))}
          </div>
        </article>
      </section>

      <Line my={12} />

      {/* 3. 종합 후기 */}
      <section className="flex flex-col gap-5">
        <h3 className="h3 mb-3">3. 종합 후기</h3>

        <article className="flex flex-col gap-1">
          <p className="mb-3 text-gray-700">
            채용과정, 분위기 등 면접에 대한 종합적인 후기를 남겨주세요.
            <RequiredMark />
          </p>
          <div className="relative">
            <Textarea
              placeholder={`예: 1차는 역령 면접으로 1:1로 진행되었습니다.\n 실제 경험을 확인하기 위한 꼬리질문이 많았으며, 자기소개서 위주로 질문이 들어왔습니다.\n2차는 임원 면접이었고 5:3으로 진행되었습니다. 이력서 위주의 질문으로 평이한 수준이었습니다. `}
            />
            <p className="c1 absolute right-0 mt-2 text-gray-600">
              {Textarea.length}/최소 20자
            </p>
          </div>
        </article>
      </section>

      <Line my={12} />

      {/* 4. 면접 팁 */}
      <section className="flex flex-col gap-5">
        <h3 className="h3 mb-3">4. 면접 팁</h3>

        <article className="flex flex-col gap-1">
          <p className="mb-3 text-gray-700"></p>
        </article>
      </section>

      {/* 5. 결과 정보 */}
      <section className="flex flex-col gap-5">
        <h3 className="h3 mb-3">5. 결과 정보</h3>

        <article className="flex flex-col gap-1">
          <p className="mb-3 text-gray-700"></p>
        </article>
      </section>

      {/* 6. 면접 참여 증빙 */}
      <section className="flex flex-col gap-5">
        <h3 className="h3 mb-3">6. 면접 참여 증빙</h3>

        <article className="flex flex-col gap-1">
          <p className="mb-3 text-gray-700"></p>
        </article>
      </section>
    </main>
  );
};

export default ReviewNewPage;
