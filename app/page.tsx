import CreateQuestionModal from '@/components/modal/CreateQuestionModal';
import SavedQuestionsModal from '@/components/modal/SavedQuestionsModal';

const MainPage = () => {
  return (
    <div className="mx-auto max-w-2xl min-w-2xs flex-col">
      <CreateQuestionModal />

      <SavedQuestionsModal />
    </div>
  );
};

export default MainPage;
