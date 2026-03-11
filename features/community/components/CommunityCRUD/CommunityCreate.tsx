'use client';

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

const CommunityCreate = () => {
  const displayData = communityMenuData.filter((v) => v.id != '1');

  return (
    <>
      <div className="mb-[-12px]">
        <BackButton label={<p>뒤로가기</p>} />
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

      <Editor />

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
