'use client';
import { useRouter, useSearchParams } from 'next/navigation';

const usePostFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const filters = {
    sort:
      (searchParams.get('sort') as 'latest' | 'likes' | 'views') || 'latest',
    searchQuery: searchParams.get('q') || '',
  };

  const updateParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === 'ALL' || value === '') params.delete(key);
      else params.set(key, value);
    });

    params.set('page', '1');

    router.replace(`?${params.toString()}`, { scroll: false });
  };
  return { ...filters, updateParams, rawParams: searchParams };
};

export default usePostFilters;
