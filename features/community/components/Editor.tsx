'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import { Editor as TipTapEditor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Toolbar from './Toolbar';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Highlight from '@tiptap/extension-highlight';
import { useEffect } from 'react';

interface EditorProps {
  setEditor: (editor: TipTapEditor | null) => void;
}

const Editor = ({ setEditor }: EditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph', 'image'],
      }),
      Highlight,
      Image,
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
    ],
    content: '<p>최적화된 에디터</p>',
    immediatelyRender: false,
    shouldRerenderOnTransaction: false,
    editorProps: {
      attributes: {
        class:
          'prose dark:prose-invert focus:outline-none min-h-[300px] p-4 max-w-none',
      },
    },
  });
  useEffect(() => {
    if (setEditor) setEditor(editor);
  }, [editor, setEditor]);

  return (
    <div className="relative min-h-100 w-full rounded-xl border border-gray-500 p-1">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
