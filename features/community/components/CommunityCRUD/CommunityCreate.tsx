'use client';

import BackButton from '@/components/common/BackButton';
import Line from '@/components/common/Line';
import { Input } from '@/components/ui/input/Input';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import { Markdown } from 'tiptap-markdown';

const CommunityCreate = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.extend({ inclusive: false }).configure({
        openOnClick: false,
      }),
      Markdown,
    ],
    content: '<p>Hello World!</p>',

    immediatelyRender: false,
  });

  return (
    <>
      <div className="mb-[-12px]">
        <BackButton label={<p className="font-bold">뒤로가기</p>} />
      </div>

      <div className="h-9 w-40">게시판 선택</div>
      <Input
        placeholder="제목을 입력하세요..."
        className="h-10"
        variant="ghost"
      />
      <Line my={1} />
      <EditorContent editor={editor} />
    </>
  );
};
export default CommunityCreate;
