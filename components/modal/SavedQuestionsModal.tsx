import { Bookmark, X } from 'lucide-react';
import Tags from '../common/Tags/Tags';
import Line from '../common/Line';
import { Button } from '../ui/button/Button';

const SavedQuestionsModal = () => {
  return (
    <section className="rounded-[16] bg-white p-9 shadow-md">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-gray-1000">저장된 면접 불러오기</h2>
        <X className="text-icon-default cursor-pointer" size={24} />
      </div>

      <div className="flex flex-col gap-4">
        <article className="flex flex-col gap-4 rounded-[16] border border-gray-500 p-4 shadow-md">
          <div className="flex flex-wrap">
            <Tags className="mr-1" size="small" color="blue">
              Infra
            </Tags>
            <Tags className="mr-1" size="small" color="red">
              인기
            </Tags>
          </div>

          <h5>프로세스와 스레드의 차이점은?</h5>

          <div className="flex gap-6 text-gray-700">
            <div className="flex items-center gap-1">
              <Bookmark size={18} />
              <p>120</p>
            </div>
            <time>2026.01.03</time>
          </div>
        </article>

        <Line my={4} />

        <div className="text-button-lg flex gap-7">
          <Button className="flex-1" variant={'white'}>
            취소
          </Button>
          <Button className="flex-1" variant={'default'}>
            선택하기
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SavedQuestionsModal;
