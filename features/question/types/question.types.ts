export interface QuestionTag {
  label: string;
}

export interface QuestionStats {
  views: number;
  comments: number;
  bookmarks: number;
}

export interface Question {
  id: string;
  status: string;
  title: string;
  content?: string;
  tags: QuestionTag[];
  createdAt: string;
  stats: QuestionStats;
}
