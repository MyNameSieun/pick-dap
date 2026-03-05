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
    // 1. 현재 URL 복사
    const params = new URLSearchParams(searchParams.toString());

    // 2. 전달받은 값만 업데이트
    Object.entries(updates).forEach(([key, value]) => {
      // 값이 없거나(ALL 포함) 기본값이면 URL에서 제거
      if (value === null || value === 'ALL') params.delete(key);
      // 아니면 URL에 해당 값을 세팅
      else params.set(key, value);
    });

    // 3. 필터 변경 시 항상 1페이지로 초기화
    params.set('page', '1');

    // 4. URL 반영
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return { ...filters, updateParams, rawParams: searchParams };
};
