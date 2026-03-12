// CommunityPreview.tsx
'use client';

import { X } from 'lucide-react';

interface PreviewProps {
  title: string;
  category: string;
  content: string;
  onClose: () => void;
}

const CommunityPreview = ({
  title,
  category,
  content,
  onClose,
}: PreviewProps) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 fixed inset-0 z-[100] overflow-y-auto bg-white duration-300 dark:bg-gray-950">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white/80 px-6 py-4 backdrop-blur-md dark:bg-gray-950/80">
        <div className="flex items-center gap-2">
          <span className="bg-main-100 text-main-600 rounded-full px-3 py-1 text-xs font-bold">
            PREVIEW MODE
          </span>
          <span className="text-sm text-gray-500">{category}</span>
        </div>
        <button
          onClick={onClose}
          className="flex items-center gap-1 rounded-full p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <X className="h-6 w-6" />
          <span className="mr-1 text-sm font-medium">닫기</span>
        </button>
      </div>

      <article className="mx-auto max-w-3xl px-6 py-16">
        <header className="mb-12 text-center">
          <p className="text-main-500 mb-4 text-lg font-medium">
            {category || '카테고리 미선택'}
          </p>
          <h1 className="mb-8 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl dark:text-white">
            {title || '제목이 입력되지 않았습니다.'}
          </h1>
          <div className="flex items-center justify-center gap-3 text-gray-500">
            <div className="h-10 w-10 rounded-full bg-gray-200" />
            <div className="text-left">
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                작성자 미리보기
              </p>
              <p className="text-xs">방금 전 · 읽기 시간 약 3분</p>
            </div>
          </div>
        </header>

        <div
          className="prose prose-lg dark:prose-invert prose-headings:scroll-mt-20 prose-img:rounded-2xl prose-pre:bg-gray-900 max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        <div className="mt-20 border-t pt-10 text-center">
          <button onClick={onClose} className="rounded-full px-10">
            미리보기 종료
          </button>
        </div>
      </article>
    </div>
  );
};

export default CommunityPreview;
