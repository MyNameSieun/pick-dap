import { CategoryTypeEnums, QuestionType, StatusEnums } from '@/types/entity';
import { useRouter, useSearchParams } from 'next/navigation';

export const useQuestionFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // 현재 어떤 필터가 걸려 있는지(읽기)
  const filters = {
    type: (searchParams.get('type') as QuestionType) || 'pickdap',
    status: (searchParams.get('status') as StatusEnums) || 'ALL',
    category:
      (searchParams.get('category') as CategoryTypeEnums | 'ALL') || 'ALL',
    searchQuery: searchParams.get('q') || '',
    techs: searchParams.get('techs') || undefined,
    sort: (searchParams.get('sort') as 'latest' | 'popular') || 'popular',
  };

  // 필터를 어떻게 바꿀 것인지(쓰기)
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
