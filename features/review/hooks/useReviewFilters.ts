import {
  EmploymentType,
  FinalStatusType,
  InterviewSeasonType,
} from '@/types/entity';
import { useRouter, useSearchParams } from 'next/navigation';

export const useReviewFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const dateParam = searchParams.get('date' as string) || 'ALL'; // URL에서 가져온 값
  const [year, season] = dateParam.split(' '); // year = "2024", season = "상반기"

  const filters = {
    finalStatusType:
      (searchParams.get('final-status') as FinalStatusType) || 'ALL',
    // 쪼개진 값을 각각 할당
    interviewYear: (year === 'ALL' ? 'ALL' : Number(year)) as number | 'ALL',
    interviewSeason: (season === 'ALL' ? 'ALL' : season) as InterviewSeasonType,

    jobRole: (searchParams.get('job-role') as string) || 'ALL',
    employmentType: (searchParams.get('employment') as EmploymentType) || 'ALL',
    processes: searchParams.get('process') || 'ALL',
    searchQuery: searchParams.get('q') || undefined,
  };
  // 필터를 어떻게 바꿀 것인지(쓰기)
  const updateParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      // 값이 없거나(ALL 포함) 기본값이면 URL에서 제거
      if (value === null || value === 'ALL') params.delete(key);
      else params.set(key, value);
    });

    params.set('page', '1');

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return { ...filters, dateParam, updateParams, rawParams: searchParams };
};
