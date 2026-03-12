// ToolBar.tsx
import ToolbarButton from '@/features/community/components/ToolbarButton';
import {
  headingOptions,
  markOptions,
  alignOptions,
  listOptions,
} from '@/features/community/components/toolbarConfig';
import ToolbarGroup from '@/features/community/components/ToolbarGroup';
import ToolbarLine from '@/features/community/components/ToolbarLine';
import { Editor } from '@tiptap/core';
import { useEditorState } from '@tiptap/react';

const Toolbar = ({ editor }: { editor: Editor | null }) => {
  const editorState = useEditorState({
    editor,
    selector: (snapshot) => {
      const { editor } = snapshot;
      if (!editor) return null;

      return {
        isHeading1: editor.isActive('heading', { level: 1 }),
        isHeading2: editor.isActive('heading', { level: 2 }),
        isHeading3: editor.isActive('heading', { level: 3 }),
        isBold: editor.isActive('bold'),
        isItalic: editor.isActive('italic'),
        isStrike: editor.isActive('strike'),
        isBulletList: editor.isActive('bulletList'),
        isOrderedList: editor.isActive('orderedList'),
        isAlignLeft: editor.isActive({ textAlign: 'left' }),
        isAlignCenter: editor.isActive({ textAlign: 'center' }),
        isAlignRight: editor.isActive({ textAlign: 'right' }),
        isHighlight: editor.isActive('highlight'),
      };
    },
  });

  if (!editor) return null;

  const safeState = editorState ?? {
    isHeading1: false,
    isHeading2: false,
    isHeading3: false,
    isBold: false,
    isItalic: false,
    isStrike: false,
    isBulletList: false,
    isOrderedList: false,
    isAlignLeft: true,
    isAlignCenter: false,
    isAlignRight: false,
    isHighlight: false,
  };

  return (
    <section className="bg-background flex flex-wrap items-center gap-2 border-b p-2">
      <ToolbarGroup>
        {headingOptions.map((option) => (
          <ToolbarButton
            key={option.stateKey}
            icon={option.icon}
            onClick={() => option.action(editor)}
            active={!!safeState[option.stateKey as keyof typeof safeState]}
            iconType="node"
          />
        ))}
      </ToolbarGroup>

      <ToolbarLine />

      <ToolbarGroup>
        {markOptions.map((option) => (
          <ToolbarButton
            key={option.stateKey}
            icon={option.icon}
            onClick={() => option.action(editor)}
            active={!!safeState[option.stateKey as keyof typeof safeState]}
            iconType="marks"
          />
        ))}
      </ToolbarGroup>

      <ToolbarLine />

      <ToolbarGroup>
        {alignOptions.map((option) => (
          <ToolbarButton
            key={option.stateKey}
            icon={option.icon}
            onClick={() => option.action(editor)}
            active={!!safeState[option.stateKey as keyof typeof safeState]}
            iconType="marks"
          />
        ))}
        <ToolbarButton
          icon="Minus"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          active={false}
          iconType="node"
        />
      </ToolbarGroup>

      <ToolbarLine />

      <ToolbarGroup>
        <ToolbarButton
          icon="Image"
          onClick={() => {
            const url = window.prompt('이미지 URL');
            if (url) editor.chain().focus().setImage({ src: url }).run();
          }}
          active={false}
          iconType="node"
        />
        <ToolbarButton
          icon="Link"
          onClick={() => {
            const url = window.prompt('링크 URL');
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
          active={editor.isActive('link')}
          iconType="marks"
        />
      </ToolbarGroup>

      <ToolbarLine />

      <ToolbarGroup>
        {listOptions.map((option) => (
          <ToolbarButton
            key={option.stateKey}
            icon={option.icon}
            onClick={() => option.action(editor)}
            active={!!safeState[option.stateKey as keyof typeof safeState]}
            iconType="node"
          />
        ))}
      </ToolbarGroup>
    </section>
  );
};

export default Toolbar;
