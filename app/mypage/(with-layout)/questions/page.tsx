'use client';
import Line from '@/components/common/Line';
import TagSearchBar from '@/components/TagSearchBar';
import QuestionCard from '@/features/mypage/components/QuestionCard';
import QuestionSearchToolbar from '@/features/mypage/components/QuestionSearchToolbar';

const MypageQuestionsPage = () => {
  return (
    <main className="flex flex-col gap-3">
      <TagSearchBar />

      <section className="container-col">
        {/* <QuestionSearchToolbar /> */}

        <Line my={4} />
        <div className="mb-4" />
        <div className="flex flex-col gap-3">
          <QuestionCard />
        </div>
      </section>
    </main>
  );
};

export default MypageQuestionsPage;
