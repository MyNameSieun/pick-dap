export const TAG_VARIANTS = {
  blue: 'text-tag-text-blue bg-tag-bg-blue',
  red: 'text-tag-text-red bg-tag-bg-red',
  gray: 'text-tag-text-gray bg-tag-bg-gray',
  yellow: 'text-tag-text-yellow bg-tag-bg-yellow',
  green: 'text-tag-text-green bg-tag-bg-green',
  purple: 'text-tag-text-purple bg-tag-bg-purple',
} as const;

export type TagColor = keyof typeof TAG_VARIANTS;
