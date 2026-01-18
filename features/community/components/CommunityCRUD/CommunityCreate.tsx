'use client';

import BackButton from '@/components/common/BackButton';
import Line from '@/components/common/Line';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import { Markdown } from 'tiptap-markdown';
import { twMerge } from 'tailwind-merge';
import CommunityToolBar from './CommunityToolBar';
import { useState } from 'react';

const CommunityCreate = () => {
  const [text, setText] = useState('Hello World!');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.extend({ inclusive: false }).configure({
        openOnClick: false,
      }),
      Markdown,
    ],
    content: text,
    onUpdate({ editor }) {
      setText(editor.getHTML());
    },
    shouldRerenderOnTransaction: true,
    immediatelyRender: true,
  });

  if (!editor) return null;

  return (
    <>
      <div className="mb-[-12px]">
        <BackButton label={<p className="font-bold">뒤로가기</p>} />
      </div>

      <div className="h-9 w-40">게시판 선택</div>
      <Line my={1} />
      <CommunityToolBar editor={editor} />

      <EditorContent
        editor={editor}
        className={twMerge(
          'b1 text-gray-1000 min-h-100 w-full rounded-[8px] border border-gray-500 p-4',
        )}
      />
    </>
  );
};
export default CommunityCreate;
