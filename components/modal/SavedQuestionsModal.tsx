import { Bookmark, Dot, X } from 'lucide-react';
import Tags from '../common/Tags/Tags';
import { savedQuestions } from '@/data/savedQuestions';
import { useEscClose } from '@/hooks/useEscClose';
import { MODAL_ID } from '@/constants/modalNames';
import {
  useSaveQuestionModalAction,
  useSaveQuestionModalState,
} from '@/store/modal/saveQuestionModal';

const SavedQuestionsModal = () => {
  const isOpen = useSaveQuestionModalState();
  const { open, close } = useSaveQuestionModalAction();
  useEscClose(MODAL_ID.SAVE_QUESTION, isOpen, close);

  return (
    <div className="modal-layout" onClick={close}>
      <section
        onClick={(e) => e.stopPropagation()}
        className="max-h-[80vh] w-[800px] overflow-hidden rounded-[16px] bg-white p-9 shadow-md"
      >
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-gray-1000">저장된 면접 불러오기</h2>
          <X
            onClick={close}
            className="text-icon-default cursor-pointer"
            size={24}
          />
        </div>

        <div className="flex flex-col gap-4">
          {savedQuestions.map((savedQuestion) => (
            <div key={savedQuestion.id}>
              <article className="flex cursor-pointer flex-col gap-4 rounded-[16] border border-gray-500 p-4 shadow-md">
                <div className="flex flex-wrap">
                  {savedQuestion.tags.map((t) => (
                    <Tags
                      key={t.label}
                      className="mr-1"
                      size="small"
                      color="blue"
                    >
                      {t.label}
                    </Tags>
                  ))}
                </div>

                <h5>{savedQuestion.title}</h5>

                <div className="flex items-center gap-1 text-gray-700">
                  <div className="flex items-center gap-1">
                    <Bookmark size={15} />
                    <p>{savedQuestion.stats.bookmarks}</p>
                  </div>
                  <Dot size={15} />
                  <time>{savedQuestion.createdAt}</time>
                </div>
              </article>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SavedQuestionsModal;
