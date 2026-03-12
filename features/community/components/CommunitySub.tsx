'use client';

import Tabs from '@/components/common/Tabs/Tabs';
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { useFetchPostCategory } from '../hooks/useFetchPostCategory';
import Loader from '@/components/ui/Loader';

const CommunitySub = ({ categoryId }: { categoryId: string }) => {
  const router = useRouter();
  const handleTabChange = (id: string) => {
    router.push(`/community/${id}`);
  };

  const { data: categories, isPending: isCategoryPending } =
    useFetchPostCategory();
  const dynamicTabs =
    categories?.map((cat) => ({
      id: cat.id,
      label: cat.name,
      content: cat.name,
    })) || [];

  if (isCategoryPending) return <Loader />;
  return (
    <>
      <div
        className={twMerge('container-row', 'w-full rounded-[6px] px-16 py-4')}
      >
        <Tabs
          tabs={dynamicTabs}
          setId={categoryId}
          onTabChange={handleTabChange}
        />
      </div>
    </>
  );
};
export default CommunitySub;
