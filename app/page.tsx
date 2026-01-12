import Tabs from '@/components/common/Tabs/Tabs';
import CreateQuestionModal from '@/components/modal/CreateQuestionModal';
import SavedQuestionsModal from '@/components/modal/SavedQuestionsModal';
import menuData from '@/data/menuData.json';

const MainPage = () => {
  return (
    <div className="mx-auto max-w-2xl min-w-2xs flex-col">
      <Tabs menu={menuData} />
      <CreateQuestionModal />
      <SavedQuestionsModal />
    </div>
  );
};

export default MainPage;
