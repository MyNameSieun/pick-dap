import SelectCountBox from '@/components/common/SelectCountBox/SelectCountBox';
import CreateQuestionModal from '@/components/modal/CreateQuestionModal';
import SavedQuestionsModal from '@/components/modal/SavedQuestionsModal';

const MainPage = () => {
  return (
    <div className="mx-auto max-w-2xl min-w-2xs flex-col">
      <SelectCountBox count={2} state="delete" />
      <CreateQuestionModal />

      <SavedQuestionsModal />
    </div>
  );
};

export default MainPage;
