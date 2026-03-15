import { CategoryTypeEnums, StatusEnums } from '@/types/entity';
import { useRouter, useSearchParams } from 'next/navigation';

export const useStatusFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filters = {
    status: (searchParams.get('status') as StatusEnums | 'ALL') || 'ALL',
    category:
      (searchParams.get('category') as CategoryTypeEnums | 'ALL') || 'ALL',
    searchQuery: searchParams.get('q') || '',
    techs: searchParams.get('techs') || undefined,
    sort: (searchParams.get('sort') as 'latest' | 'popular') || 'popular',
  };

  const updateParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === 'ALL') params.delete(key);
      else params.set(key, value);
    });

    params.set('page', '1');

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return { ...filters, updateParams, rawParams: searchParams };
};
