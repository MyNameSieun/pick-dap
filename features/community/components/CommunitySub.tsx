'use client';

import Tabs from '@/components/common/Tabs/Tabs';
import { useRouter } from 'next/navigation';
import { useFetchPostCategory } from '../hooks/useFetchPostCategory';
import Loader from '@/components/ui/Loader';
import CommunityContents from './CommunityContents';

const CommunitySub = ({ categorySlug }: { categorySlug: string }) => {
  const router = useRouter();
  const { data: categories, isPending: isCategoryPending } =
    useFetchPostCategory();

  const handleTabChange = (slug: string) => {
    const path = `/community/${slug}`;
    router.push(path);
  };
  if (isCategoryPending) return <Loader />;

  const dynamicTabs =
    categories?.map((cat) => ({
      id: cat.slug,
      label: cat.name,
      content: <CommunityContents categorySlug={cat.slug} />,
    })) || [];

  if (isCategoryPending) return <Loader />;
  return (
    <>
      <Tabs
        tabs={dynamicTabs}
        setId={categorySlug}
        onTabChange={handleTabChange}
      />
    </>
  );
};
export default CommunitySub;
