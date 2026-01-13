'use client';

import Tabs from '@/components/common/Tabs/Tabs';
import { communityMenuData } from '@/data/menuData';
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

const CommunitySub = ({ categoryId }: { categoryId: string }) => {
  const router = useRouter();
  const handleTabChange = (id: string) => {
    router.push(`/community/${id}`);
  };
  return (
    <>
      <div
        className={twMerge('container-row', 'w-full rounded-[6px] p-4 px-16')}
      >
        <Tabs
          tabs={communityMenuData}
          setId={categoryId}
          onTabChange={handleTabChange}
        />
      </div>
    </>
  );
};
export default CommunitySub;
