'use client';

import HeaderTitleBox from '@/components/common/HeaderTitleBox';
import { Input } from '@/components/ui/input/Input';
import { Activity, Search, SquarePen } from 'lucide-react';
import { useRouter } from 'next/navigation';

const CommunityMain = () => {
  const router = useRouter();
  return (
    <>
      <div>
        <HeaderTitleBox
          icon={Activity}
          title={<h4>커뮤니티</h4>}
          buttonOption={{
            text: '글쓰기',
            icon: SquarePen,
            action: () => router.push('/community/post/new'),
          }}
          content={
            <p className="c1 text-gray-600">
              면접 경험을 공유하고 다른 사람들의 후기를 확인해보세요
            </p>
          }
        />
      </div>
      <div className="mt-[-2rem] flex w-full items-center gap-4">
        <Input placeholder="검색어를 입력하세요" rightIcon={Search} />
      </div>
    </>
  );
};
export default CommunityMain;
