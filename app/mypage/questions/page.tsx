import TagSearchBar from '@/components/TagSearchBar';
import QuestionBox from '@/features/mypage/components/QuestionBox';

const MypageQuestionsPage = () => {
  return (
    <main className="flex flex-col gap-3">
      <TagSearchBar />

      <section className="rounded-[14px] bg-white px-9 py-10 shadow-sm">
        <div className="flex flex-col gap-3">
          <QuestionBox />
          <QuestionBox />
          <QuestionBox />
          <QuestionBox />
          <QuestionBox />
          <QuestionBox />
          <QuestionBox />
          <QuestionBox />
          <QuestionBox />
        </div>
      </section>
    </main>
  );
};

export default MypageQuestionsPage;
