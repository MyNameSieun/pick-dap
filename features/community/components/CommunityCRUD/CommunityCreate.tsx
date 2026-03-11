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
import { communityMenuData } from '@/data/menuData';
import { Button } from '@/components/ui/button/Button';
import Editor from '../Editor';
import CommunityPreview from './CommunityPreview';

const CommunityCreate = () => {
  const displayData = communityMenuData.filter((v) => v.id != '1');

  // 상태 관리
  const [editorInstance, setEditorInstance] = useState<TipTapEditor | null>(
    null,
  );
  const [showPreview, setShowPreview] = useState(false);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');

  const handleSave = () => {
    if (!editorInstance) return;
    if (!title.trim()) return alert('제목을 입력해주세요.');
    if (!category) return alert('게시판을 선택해주세요.');

    const htmlContent = editorInstance.getHTML(); // 본문 HTML
    const textContent = editorInstance.getText(); // 순수 텍스트(요약용)

    const postPayload = {
      category,
      title,
      content: htmlContent,
      summary: textContent.slice(0, 100),
    };

    console.log('서버로 전송할 데이터:', postPayload);
    // 여기서 서버로 전송하면 된다.
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="mb-[-12px]">
        <BackButton label={<p>뒤로가기</p>} />
      </div>

      {/* 게시판 선택 */}
      <Select onValueChange={setCategory}>
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

      {/* 제목 입력 */}
      <input
        placeholder="제목을 입력하세요..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="text-gray-1000 selection:bg-main-400 mb-2 w-full border-b border-b-gray-500 py-2 text-[28px] font-bold outline-0 selection:text-white placeholder:text-gray-600"
      />

      {/* 에디터 - setEditor 프롭 전달 */}
      <Editor setEditor={setEditorInstance} />

      <div className="flex w-full items-center justify-end gap-5">
        <Button
          variant="white"
          className="h-9 w-25"
          onClick={() => window.history.back()}
        >
          취소
        </Button>
        <button
          onClick={() => setShowPreview(true)} // 미리보기 열기
          className="h-9 w-25"
        >
          미리보기
        </button>
        <Button onClick={handleSave} className="h-9 w-25">
          저장
        </Button>
      </div>
      {/* 미리보기 모달 표시 */}
      {showPreview && editorInstance && (
        <CommunityPreview
          title={title}
          category={category}
          content={editorInstance.getHTML()}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
};

export default CommunityCreate;
