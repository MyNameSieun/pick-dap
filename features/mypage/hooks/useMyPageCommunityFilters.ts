import { useRouter, useSearchParams } from 'next/navigation';

const useMyPageCommunityFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filters = {
    category: searchParams.get('category') || 'ALL',
    sort:
      (searchParams.get('sort') as 'latest' | 'likes' | 'views') || 'latest',
  };

  const updateParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === 'ALL') params.delete(key);
      else params.set(key, value);
    });
    params.set('page', '1');
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return { ...filters, updateParams };
};

export default useMyPageCommunityFilters;
