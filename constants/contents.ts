import { PROJECT_CONTENTS, REVIEW_CONTENTS } from '@/types/contents';

export interface ContentItem {
  label: string;
  id: string;
}

export interface ContentItems {
  contents: readonly ContentItem[];
}

type ReviewContentType = typeof REVIEW_CONTENTS;
type ProjectContentType = typeof PROJECT_CONTENTS;

export type ContentsType = ReviewContentType | ProjectContentType;
