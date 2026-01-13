// @/constants/selectOptions.ts
import { jobCategories } from '@/constants/jobCategories';

export const PASS_STATUS_OPTIONS = [
  { label: '합격', value: '합격' },
  { label: '불합격', value: '불합격' },
  { label: '진행중', value: '진행중' },
];

export const INTERVIEW_PERIOD_OPTIONS = [
  { label: '2024 상반기', value: '2024 상반기' },
  { label: '2024 하반기', value: '2024 하반기' },
  { label: '2025 상반기', value: '2025 상반기' },
  { label: '2025 하반기', value: '2025 하반기' },
  { label: '2026 상반기', value: '2026 상반기' },
];

export const JOB_CATEGORY_OPTIONS = jobCategories.map((jobCategory) => ({
  label: jobCategory,
  value: jobCategory,
}));

export const EMPLOYMENT_TYPE_OPTIONS = [
  { label: '신입', value: '신입' },
  { label: '경력', value: '경력' },
  { label: '계약직', value: '계약직' },
  { label: '인턴', value: '인턴' },
];

export const INTERVIEW_TYPE_OPTIONS = [
  { label: '인적성', value: '인적성' },
  { label: '코딩테스트', value: '코딩테스트' },
  { label: 'PT', value: 'PT' },
  { label: '과제수행', value: '과제수행' },
  { label: '토론', value: '토론' },
  { label: '역량 / 실무진', value: '역량 / 실무진' },
  { label: '임원 / 최종', value: '임원 / 최종' },
  { label: 'AI면접', value: 'AI면접' },
];
