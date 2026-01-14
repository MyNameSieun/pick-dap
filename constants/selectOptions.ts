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

// 지원 유형
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

// 면접 난이도
export const INTERVIEW_LEVEL = ['쉬움', '보통', '어려움'];

// 질문 유형
export const INTERVIEW_QUESTION_TYPE = [
  '자기소개',
  '지원동기',
  '상황 대처',
  '회사 지식',
  '직무 지식',
  '사회이슈',
  '입사 후 포부',
  '마지막 질문',
];

export const INTERVIEW_PERSONNEL = ['1:1 면접', '면접관 다수', '어려움'];

export const INTERVIEW_TIME = [
  '1일',
  '2~3일',
  '4~5일',
  '1주',
  '2~3주',
  '한 달 이상',
  '결과 대기중',
];
