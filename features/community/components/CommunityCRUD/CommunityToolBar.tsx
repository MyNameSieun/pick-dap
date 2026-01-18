import { Button } from '@/components/ui/button/Button';
import { Editor } from '@tiptap/react';
import {
  Bold,
  FlipHorizontal,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  Link,
  List,
  ListOrdered,
  Strikethrough,
} from 'lucide-react';

type ToolBarProps = {
  editor: Editor;
};

const CommunityToolBar = ({ editor }: ToolBarProps) => {
  return (
    <div className="absolute top-0 right-0 left-0 flex items-center rounded-[8px] border-b border-b-gray-500 bg-gray-100/50 p-1">
      <Button
        size="icon"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <Heading1
          className={
            editor.isActive('heading', { level: 2 }) ? 'is-active' : ''
          }
        />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        <Heading2
          className={
            editor.isActive('heading', { level: 3 }) ? 'is-active' : ''
          }
        />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
      >
        <Heading3
          className={
            editor.isActive('heading', { level: 4 }) ? 'is-active' : ''
          }
        />
      </Button>

      <div className="mx-2 h-6 w-[1px] bg-gray-400" />

      <Button
        size="icon"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className={editor.isActive('bold') ? 'is-active' : ''} />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className={editor.isActive('italic') ? 'is-active' : ''} />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough
          className={editor.isActive('strike') ? 'is-active' : ''}
        />
      </Button>

      <div className="mx-2 h-6 w-[1px] bg-gray-400" />

      <Button
        size="icon"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className={editor.isActive('bulletList') ? 'is-active' : ''} />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered
          className={editor.isActive('orderedList') ? 'is-active' : ''}
        />
      </Button>

      <div className="mx-2 h-6 w-[1px] bg-gray-400" />

      <Button size="icon" variant="ghost" onClick={() => {}}>
        <Link className={editor.isActive('link') ? 'is-active' : ''} />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <FlipHorizontal />
      </Button>
    </div>
  );
};
export default CommunityToolBar;
