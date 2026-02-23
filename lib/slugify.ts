export const generateSlug = (title: string): string => {
  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s가-힣ㄱ-ㅎㅏ-ㅣ-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');

  // 만약 특수문자만 있어서 슬러그가 비어버린 경우
  if (!slug) {
    return `${Date.now()}`; // 타임스탬프
  }
  return `${slug}`;
};
