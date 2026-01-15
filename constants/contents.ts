import { ContentItem } from '@/types/contents';

export const REVIEW_CONTENTS: ContentItem[] = [
  { label: '기본 정보', id: 'basic-info' },
  { label: '면접 평가', id: 'evaluation' },
  { label: '종합 후기', id: 'review' },
  { label: '면접 팁', id: 'tips' },
  { label: '결과 정보', id: 'result' },
  { label: '면접 참여 증빙', id: 'proof' },
] as const;

export const PROJECT_CONTENTS: ContentItem[] = [
  { label: '프로젝트 개요', id: 'overview' },
  { label: '기술 스택', id: 'tech-stack' },
  { label: '핵심 기능', id: 'features' },
  { label: '담당 역할', id: 'role' },
  { label: '문제 해결 경험', id: 'troubleshooting' },
  { label: '프로젝트 성과', id: 'achievements' },
  { label: '개선점 / 회고', id: 'retrospective' },
  { label: '결과물', id: 'deliverables' },
  { label: '추가 정보', id: 'extra-info' },
] as const;
