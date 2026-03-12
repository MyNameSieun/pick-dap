export const COMMUNITY_TAG = {
  'd6e54710-1a6a-4ea2-a1b2-0ee38111a3d3': 'blue',
  'a8b921f6-ef0d-4cb0-8ca3-36af8138ba26': 'green',
  '64909e8b-f3c5-462d-bf69-77de4294896e': 'yellow',
  '41a4492b-b33f-4dbc-8b60-ada8b1bd12e4': 'red',
  '55ae44aa-820e-4322-81a8-8ea9a5866274': 'purple',
} as const;

export type CommunityTagType =
  (typeof COMMUNITY_TAG)[keyof typeof COMMUNITY_TAG];
