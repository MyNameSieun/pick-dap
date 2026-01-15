import { PROJECT_CONTENTS, REVIEW_CONTENTS } from '@/constants/contents';

export interface ContentItem {
  label: string;
  id: string;
}

type ReviewContentType = typeof REVIEW_CONTENTS;
type ProjectContentType = typeof PROJECT_CONTENTS;

export type ContentsType = ReviewContentType | ProjectContentType;
