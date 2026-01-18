import { Button } from '@/components/ui/button/Button';
import { Editor } from '@tiptap/react';
import { Bold } from 'lucide-react';

type ToolBarProps = {
  editor: Editor;
};

const CommunityToolBar = ({ editor }: ToolBarProps) => {
  return (
    <div className="flex h-12 w-full items-center rounded-[8px] border border-gray-500 p-2">
      <Button size="icon" variant="ghost">
        <Bold
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
        />
      </Button>
    </div>
  );
};
export default CommunityToolBar;
