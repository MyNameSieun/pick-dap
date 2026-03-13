'use client';

import { useState, useEffect, useMemo } from 'react';
import { Editor as TipTapEditor } from '@tiptap/core';
import { useRouter } from 'next/navigation';
import { Monitor } from 'lucide-react';
import { motion } from 'framer-motion';

import Editor from '../Editor';
import CommunityPreview from './CommunityPreview';
import BackButton from '@/components/common/BackButton';
import { Button } from '@/components/ui/button/Button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import Loader from '@/components/ui/Loader';
import { useFetchPostCategory } from '../../hooks/useFetchPostCategory';

export interface PostWithDetails {
  id: string;
  title: string;
  content: string;
  category_id: string;
  image_urls?: string[] | null;
}

interface CommunityFormProps {
  mode: 'CREATE' | 'EDIT';
  initialData?: PostWithDetails;
  onSubmit: (data: {
    title: string;
    content: string;
    category_id: string;
    image_urls: string[];
  }) => void;
  isSubmitting: boolean;
}

const CommunityForm = ({
  mode,
  initialData,
  onSubmit,
  isSubmitting,
}: CommunityFormProps) => {
  const router = useRouter();

  const [editorInstance, setEditorInstance] = useState<TipTapEditor | null>(
    null,
  );
  const [showPreview, setShowPreview] = useState(false);

  const [title, setTitle] = useState(initialData?.title || '');
  const [categoryId, setCategoryId] = useState(initialData?.category_id || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [images, setImages] = useState<string[]>(initialData?.image_urls || []);

  const { data: categories, isPending: isCategoryPending } =
    useFetchPostCategory();

  useEffect(() => {
    if (!editorInstance) return;

    const updateHandler = () => {
      setContent(editorInstance.getHTML());
    };

    editorInstance.on('update', updateHandler);

    if (initialData?.content && editorInstance.isEmpty) {
      editorInstance.commands.setContent(initialData.content);
    }

    return () => {
      editorInstance.off('update', updateHandler);
    };
  }, [editorInstance, initialData?.content]);

  const isChanged = useMemo(() => {
    const isTitleChanged = title !== (initialData?.title || '');
    const isCategoryChanged = categoryId !== (initialData?.category_id || '');
    const isContentChanged = content !== (initialData?.content || '');

    const initialImages = initialData?.image_urls || [];
    const isImagesChanged =
      initialImages.length !== images.length ||
      !images.every((img, idx) => img === initialImages[idx]);

    return (
      isTitleChanged || isCategoryChanged || isContentChanged || isImagesChanged
    );
  }, [title, categoryId, content, images, initialData]);

  if (isCategoryPending) return <Loader />;

  const handleFormSubmit = () => {
    if (!editorInstance) return;

    onSubmit({
      title,
      content,
      category_id: categoryId,
      image_urls: images,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-4"
    >
      <Select onValueChange={setCategoryId} defaultValue={categoryId}>
        <SelectTrigger className="h-9 w-40 cursor-pointer">
          <SelectValue placeholder="게시판 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>커뮤니티</SelectLabel>
            {categories?.map((c) => (
              <SelectItem key={c.id} value={c.id} className="cursor-pointer">
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
        className="text-gray-1000 focus:border-b-main-600 mb-2 w-full border-b border-b-gray-500 py-2 text-[28px] font-bold outline-0 transition-colors placeholder:text-gray-600"
      />

      <Editor setEditor={setEditorInstance} />

      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={() => setShowPreview(true)}
          className="text-icon-default flex h-9 items-center gap-2 text-sm font-medium transition-colors hover:text-gray-900"
        >
          <Monitor className="h-5 w-5" /> 미리보기
        </button>

        <div className="flex items-center gap-4 font-bold">
          <Button variant="white" onClick={() => router.back()}>
            취소
          </Button>

          <Button
            disabled={
              isSubmitting ||
              !title.trim() ||
              !categoryId ||
              (editorInstance?.isEmpty ?? true) ||
              (mode === 'EDIT' && !isChanged)
            }
            onClick={handleFormSubmit}
            className="relative w-24 overflow-hidden"
          >
            {isSubmitting
              ? '저장 중'
              : mode === 'CREATE'
                ? '저장'
                : '수정 완료'}
          </Button>
        </div>
      </div>

      {showPreview && editorInstance && (
        <CommunityPreview
          title={title}
          categoryId={categoryId}
          content={content}
          onClose={() => setShowPreview(false)}
        />
      )}
    </motion.div>
  );
};

export default CommunityForm;
