export const COMMUNITY_CATEGORY = {
  '1': '전체',
  '2': '자유게시판',
  '3': '면접정보',
  '4': '스터디',
  '5': '질의 응답',
  '6': '프로젝트',
} as const;

export type CommunityCategoryType =
  (typeof COMMUNITY_CATEGORY)[keyof typeof COMMUNITY_CATEGORY];

export const COMMUNITY_TAG = {
  '2': 'blue',
  '3': 'red',
  '4': 'yellow',
  '5': 'green',
  '6': 'purple',
} as const;

export type CommunityTagType =
  (typeof COMMUNITY_TAG)[keyof typeof COMMUNITY_TAG];
