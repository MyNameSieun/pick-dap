import { create } from 'zustand';
import { CreateReviewParams } from '../services/createReview';
import {
  DifficultyType,
  EmploymentType,
  FinalStatusType,
  InterviewPersonnelType,
  InterviewSeasonType,
  ResultWaitTimeType,
} from '@/types/entity';

interface QuestionItem {
  id: string;
  review_content: string;
}

interface ReviewState {
  formData: CreateReviewParams;
  // 일반 필드 업데이트 (문자열, 숫자 등)
  setField: (field: string, value: string | number | QuestionItem[]) => void;
  // 질문 목록 업데이트 (1:N)
  setQuestions: (questions: QuestionItem[]) => void;
  // 체크박스/다중 선택 업데이트 (M:N)
  toggleId: (field: 'processIds' | 'questionTypeIds', id: string) => void;
  // 초기화
  reset: () => void;
}

const initialState: CreateReviewParams = {
  job_role_id: '',
  company_name: '',

  interview_year: new Date().getFullYear(),
  interview_season: '' as InterviewSeasonType,

  employment_type: '' as EmploymentType,
  atmosphere_score: 3,
  difficulty: '' as DifficultyType,
  interview_personnel_type: '' as InterviewPersonnelType,
  overall_review: '',
  interview_tip: '',
  result_wait_time_type: '' as ResultWaitTimeType,
  final_status_type: '' as FinalStatusType,
  proof_url: '',

  questions: [{ id: '1', review_content: '' }],
  processIds: [],
  questionTypeIds: [],
};

export const useReviewStore = create<ReviewState>((set) => ({
  formData: initialState,

  // 1. 일반 텍스트 및 단일 선택 필드 수정
  setField: (field, value) =>
    set((state) => ({
      formData: { ...state.formData, [field]: value },
    })),

  // 2. 질문 목록 수정 (추가/삭제/수정된 배열 전체를 교체)
  setQuestions: (questions) =>
    set((state) => ({
      formData: { ...state.formData, questions },
    })),

  // 3. 다중 선택 필드 (체크박스) 토글 로직
  toggleId: (field, id) =>
    set((state) => {
      const currentIds = state.formData[field];
      const nextIds = currentIds.includes(id)
        ? currentIds.filter((currentId) => currentId !== id) // 있으면 제거
        : [...currentIds, id]; // 없으면 추가

      return {
        formData: { ...state.formData, [field]: nextIds },
      };
    }),

  // 4. 스토어 리셋
  reset: () => set({ formData: initialState }),
}));
