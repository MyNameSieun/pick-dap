export const isUpdateWrite = (createdAt: string, updatedAt: string) => {
  return createdAt !== updatedAt;
};
