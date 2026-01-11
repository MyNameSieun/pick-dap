import TagSearchBar from '@/components/TagSearchBar';
import QuestionCard from '@/features/mypage/components/QuestionCard';

const MypageQuestionsPage = () => {
  return (
    <main className="flex flex-col gap-3">
      <TagSearchBar />

      <section className="container-col">
        <div className="flex flex-col gap-3">
          <QuestionCard />
          <QuestionCard />
          <QuestionCard />
          <QuestionCard />
          <QuestionCard />
          <QuestionCard />
          <QuestionCard />
          <QuestionCard />
        </div>
      </section>
    </main>
  );
};

export default MypageQuestionsPage;
