'use client';

import BackButton from '@/components/common/BackButton';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { twMerge } from 'tailwind-merge';
import CommunityToolBar from './CommunityToolBar';
import { useState } from 'react';
import Link from '@tiptap/extension-link';
import { Markdown } from 'tiptap-markdown';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { communityMenuData } from '@/data/menuData';
import { Button } from '@/components/ui/button/Button';

const CommunityCreate = () => {
  const [text, setText] = useState('원하는 내용을 작성해보세요!');
  const displayData = communityMenuData.filter((v) => v.id != '1');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.extend({ inclusive: false }).configure({
        openOnClick: false,
      }),
      Markdown,
    ],
    content: text,
    editorProps: {
      attributes: {
        class: 'min-h-[300px] outline-none',
      },
    },
    onUpdate({ editor }) {
      setText(editor.getHTML());
    },
    immediatelyRender: false,
  });

  if (!editor) return null;

  return (
    <>
      <div className="mb-[-12px]">
        <BackButton label={<p className="font-bold">뒤로가기</p>} />
      </div>

      <Select>
        <SelectTrigger className="h-9 w-40 cursor-pointer">
          <SelectValue placeholder="게시판 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>커뮤니티</SelectLabel>
            {displayData.map((v) => (
              <SelectItem className="cursor-pointer" key={v.id} value={v.label}>
                {v.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <input
        placeholder="제목을 입력하세요..."
        className="text-gray-1000 selection:bg-main-400 mb-2 w-full border-b border-b-gray-500 py-2 text-[28px] font-bold outline-0 selection:text-white placeholder:text-gray-600"
      />

      <div className="relative min-h-100 w-full rounded-[8px] border border-gray-500">
        <CommunityToolBar editor={editor} />
        <EditorContent
          editor={editor}
          className={twMerge(
            'b1 text-gray-1000 px-4 pt-16 [&_.ProseMirror]:focus:outline-none',
          )}
        />
      </div>

      <div className="flex w-full items-center justify-end gap-5">
        <Button variant="white" className="h-9 w-25">
          취소
        </Button>
        <Button className="h-9 w-25">저장</Button>
      </div>
    </>
  );
};
export default CommunityCreate;
