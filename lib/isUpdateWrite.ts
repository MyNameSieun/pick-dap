export const isUpdateWrite = (createdAt: string, updatedAt: string) => {
  const created = new Date(createdAt).getTime();
  const updated = new Date(updatedAt).getTime();

  return Math.abs(updated - created) < 1000;
};
