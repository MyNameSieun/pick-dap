export const isUpdateWrite = (createdAt: string, updateAt: string) => {
  if (createdAt !== updateAt) return false;
};
