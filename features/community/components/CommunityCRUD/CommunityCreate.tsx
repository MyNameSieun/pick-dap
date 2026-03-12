'use client';

import { useState } from 'react';
import { Editor as TipTapEditor } from '@tiptap/core';
import BackButton from '@/components/common/BackButton';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { Button } from '@/components/ui/button/Button';
import Editor from '../Editor';
import CommunityPreview from './CommunityPreview';
import { Monitor } from 'lucide-react';
import { useCreatePost } from '../../hooks/useCreatePost';
import Loader from '@/components/ui/Loader';
import { useFetchPostCategory } from '../../hooks/useFetchPostCategory';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const CommunityCreate = () => {
  const [editorInstance, setEditorInstance] = useState<TipTapEditor | null>(
    null,
  );
  const [showPreview, setShowPreview] = useState(false);

  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const { data: categories, isPending: isCategoryPending } =
    useFetchPostCategory();

  const router = useRouter();
  const { mutate: createPost, isPending: isPostPending } = useCreatePost({
    onSuccess: (data) => {
      toast.success('게시글이 등록되었습니다.', { position: 'top-center' });
      router.push(`/community/${data?.post_category.slug}/${data?.slug}`);
    },
  });

  if (isPostPending || isCategoryPending) return <Loader />;

  const handleSave = () => {
    if (!editorInstance) return;

    const htmlContent = editorInstance.getHTML();

    createPost({
      title,
      content: htmlContent,
      image_urls: [],
      category_id: categoryId,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="mb-[-12px]">
        <BackButton label={<p>뒤로가기</p>} />
      </div>

      {/* 게시판 선택 */}
      <Select onValueChange={setCategoryId}>
        <SelectTrigger className="h-9 w-40 cursor-pointer">
          <SelectValue placeholder="게시판 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>커뮤니티</SelectLabel>
            {categories?.map((c) => (
              <SelectItem className="cursor-pointer" key={c.id} value={c.id}>
                {c.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <input
        placeholder="제목을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="text-gray-1000 selection:bg-main-400 mb-2 w-full border-b border-b-gray-500 py-2 text-[28px] font-bold outline-0 selection:text-white placeholder:text-gray-600"
      />

      <Editor setEditor={setEditorInstance} />

      <div className="flex">
        <button
          onClick={() => setShowPreview(true)}
          className="text-icon-default flex h-9 w-25 items-center gap-2 text-sm"
        >
          <Monitor className="h-5 w-5" />
          미리보기
        </button>
        <div className="flex w-full items-center justify-end gap-5 font-bold">
          <Button variant="white" onClick={() => window.history.back()}>
            취소
          </Button>

          <Button
            disabled={
              isPostPending ||
              !title.trim() ||
              !categoryId ||
              editorInstance?.isEmpty
            }
            onClick={handleSave}
            className="w-22"
          >
            저장
          </Button>
        </div>
      </div>

      {/* 미리보기 모달 표시 */}
      {showPreview && editorInstance && (
        <CommunityPreview
          title={title}
          categoryId={categoryId}
          content={editorInstance.getHTML()}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
};

export default CommunityCreate;
