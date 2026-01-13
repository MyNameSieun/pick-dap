export interface SelectOption {
  label: string;
  value: string;
}

export interface BasicInfo {
  companyName: string;
  jobCategory: string;
  interviewDate: string;
  employmentType: '신입' | '경력' | '인턴' | '계약직';
}

export interface InterviewEvaluation {
  atmosphere: {
    type: '편안' | '경직';
    score: number; // 1~5
  };
  difficulty: '쉬움' | '보통' | '어려움';
  interviewSteps: string[];
  intervieweeCount: string[];
}

export interface SpecificQuestion {
  id: number | string;
  question: string;
}

export interface ReviewContent {
  overallReview: string;
  questionTypes: string[];
  specificQuestions: SpecificQuestion[];
  interviewTip: string;
}

export interface ResultInfo {
  resultWaitingPeriod: string;
  finalStatus: '합격' | '불합격' | '진행중';
}

export interface InterviewReview {
  id: string;
  basicInfo: BasicInfo;
  evaluation: InterviewEvaluation;
  reviewContent: ReviewContent;
  resultInfo: ResultInfo;
  evidenceUrl?: string;
}

export type InterviewReviews = InterviewReview[];
