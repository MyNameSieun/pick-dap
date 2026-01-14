import { Textarea } from "@/components/ui/textarea/Textarea";
import FormItemLayout from "./FormItemLayout";
import FormSection from "./FormSection";

const Tips = () => {
  return (
    <FormSection title="4. 면접 팁" id="tips">
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
  );
};

export default Tips;
