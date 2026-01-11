import Line from '@/components/common/Line';
import TagSearchBar from '@/components/TagSearchBar';
import { Bookmark, Bot, FolderOpen, Settings, Users } from 'lucide-react';

import profileImage from '@/public/profile.jpg';
import Image from 'next/image';

const MypageQuestionsPage = () => {
  return (
    <main className="flex gap-4">
      <section className="w-[238] rounded-md border border-gray-300 bg-white p-6 shadow-md">
        <article className="flex flex-col items-center gap-5">
          <div className="relative h-30 w-30 overflow-hidden rounded-full">
            <Image
              className="object-cover"
              alt="작성자 프로필"
              src={profileImage}
              fill
              priority
            />
          </div>
          <div className="flex gap-3">
            <h6 className="text-gray-800">사용자2</h6>
            <Settings className="text-icon-default" />
          </div>
        </article>
        <Line />

        <article>
          <h6>마이페이지</h6>
        </article>

        <Line />
      </section>

      <section className="flex-1">
        <TagSearchBar />
      </section>
    </main>
  );
};

export default MypageQuestionsPage;
