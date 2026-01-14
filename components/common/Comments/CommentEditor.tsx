import { Button } from '@/components/ui/button/Button';
import { Input } from '@/components/ui/input/Input';
import { MessageSquare } from 'lucide-react';

const CommentEditor = () => {
  return (
    <div className="flex h-9 w-full items-center gap-4">
      <MessageSquare size={32} className="text-icon-default" />
      <Input placeholder="댓글을 입력하세요..." className="min-w-180" />
      <Button className="h-9">댓글 등록</Button>
    </div>
  );
};
export default CommentEditor;
