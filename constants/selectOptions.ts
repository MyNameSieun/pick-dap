import {
  DifficultyType,
  EmploymentType,
  FinalStatusType,
  InterviewPersonnelType,
  ResultWaitTimeType,
  StatusEnums,
} from '@/types/entity';

export const PASS_STATUS_OPTIONS: {
  label: FinalStatusType;
  value: FinalStatusType;
}[] = [
  { label: '합격', value: '합격' },
  { label: '불합격', value: '불합격' },
  { label: '진행중', value: '진행중' },
];

export const SEASON_OPTIONS = [
  { label: '2026 상반기', value: '2026 상반기' },
  { label: '2025 하반기', value: '2025 하반기' },
  { label: '2025 상반기', value: '2025 상반기' },
  { label: '2024 하반기', value: '2024 하반기' },
  { label: '2024 상반기', value: '2024 상반기' },
];

// 지원 유형
export const EMPLOYMENT_TYPE_OPTIONS: {
  label: EmploymentType;
  value: EmploymentType;
}[] = [
  { label: '신입', value: '신입' },
  { label: '경력', value: '경력' },
  { label: '계약직', value: '계약직' },
  { label: '인턴', value: '인턴' },
];

// 면접 난이도
export const INTERVIEW_LEVEL: DifficultyType[] = ['쉬움', '보통', '어려움'];

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

export const INTERVIEW_PERSONNEL: InterviewPersonnelType[] = [
  '1:1',
  '그룹 면접',
  '면접관 다수',
];

export const RESULT_WAIT_TIME: ResultWaitTimeType[] = [
  '1일',
  '2~3일',
  '4~5일',
  '1주',
  '2~3주',
  '한 달 이상',
  '결과 대기중',
];

export const FILTER_OPTIONS: { value: 'ALL' | StatusEnums; label: string }[] = [
  { value: 'ALL', label: '전체' },
  { value: 'pending', label: '미답변' },
  { value: 'completed', label: '답변완료' },
];
