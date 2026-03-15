'use client';

import { X, Eye, Heart } from 'lucide-react';
import { useFetchPostCategory } from '../../hooks/useFetchPostCategory';

interface PreviewProps {
  title: string;
  categoryId: string;
  content: string;
  onClose: () => void;
}

const CommunityPreview = ({
  title,
  categoryId,
  content,
  onClose,
}: PreviewProps) => {
  const { data: postsCategory } = useFetchPostCategory();
  const filterCategory = postsCategory?.find((p) => p.id === categoryId);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 fixed inset-0 z-[100] flex flex-col overflow-y-auto bg-gray-50/95 backdrop-blur-sm duration-300">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-6 py-3 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-blue-600">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
            </span>
            <span className="text-xs font-bold tracking-wider uppercase">
              Preview Mode
            </span>
          </div>
          <span className="text-sm font-medium text-gray-400">|</span>
          <span className="text-sm font-semibold text-gray-500">
            {filterCategory?.name || '카테고리 미선택'}
          </span>
        </div>

        <button
          onClick={onClose}
          className="group flex items-center gap-2 rounded-full bg-gray-900 px-4 py-2 text-white transition-all hover:bg-gray-800 active:scale-95"
        >
          <span className="text-sm font-bold">미리보기 닫기</span>
          <X className="h-4 w-4 transition-transform group-hover:rotate-90" />
        </button>
      </div>

      <main className="mx-auto w-full max-w-4xl px-4 py-10">
        <div className="mb-4">
          <div className="inline-block rounded-md bg-gray-200 px-3 py-1 text-xs font-bold text-gray-500">
            미리보기
          </div>
        </div>

        <article className="flex w-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-col gap-6 p-8 md:p-10">
            <div className="flex flex-col gap-4">
              <div className="flex items-start justify-between gap-4">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
                  {title || '제목이 입력되지 않았습니다.'}
                </h1>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-[13px] font-medium text-gray-600">
                    <Eye size={16} />
                    <span>0</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 border-b border-gray-50 pb-6">
                <div className="h-10 w-10 rounded-full border border-gray-50 bg-gray-100" />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-900">
                    작성자 미리보기
                  </span>
                  <span className="text-medium text-xs text-gray-400">
                    방금 전
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-8">
              <div
                className="prose prose-headings:font-bold prose-img:rounded-xl max-w-none text-[16px] leading-[1.8] text-gray-800"
                dangerouslySetInnerHTML={{
                  __html:
                    content ||
                    '<p className="text-gray-400">내용이 비어있습니다.</p>',
                }}
              />
            </div>

            <div className="mt-8 flex justify-center py-4">
              <div className="flex h-12 items-center gap-2.5 rounded-full border border-gray-100 bg-gray-50/50 px-8 text-gray-300">
                <Heart size={20} />
                <span className="text-base font-bold">0</span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 bg-gray-50/50 p-8 md:p-10">
            <div className="mb-6 flex items-center gap-2 opacity-40">
              <h3 className="text-lg font-bold text-gray-900">댓글</h3>
              <span className="rounded-full bg-gray-200 px-2.5 py-0.5 text-xs font-bold text-gray-600">
                0
              </span>
            </div>
            <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center text-sm font-medium text-gray-400">
              댓글 영역은 실제 게시 후에 활성화됩니다.
            </div>
          </div>
        </article>

        <div className="mt-10 flex flex-col items-center gap-4">
          <button
            onClick={onClose}
            className="rounded-full border border-gray-300 bg-white px-8 py-3 text-sm font-bold text-gray-700 shadow-sm transition-all hover:bg-gray-50 active:scale-95"
          >
            미리보기 종료하고 계속 작성하기
          </button>
        </div>
      </main>
    </div>
  );
};

export default CommunityPreview;
