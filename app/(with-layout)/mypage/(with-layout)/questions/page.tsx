import QuestionMain from '@/features/interview/components/QuestionMain';

export const generateMetadata = async () => {
  return {
    title: '저장된 질문',
    default: '저장된 질문',
  };
};

const MypageQuestionsPage = () => {
  return <QuestionMain />;
};

export default MypageQuestionsPage;
