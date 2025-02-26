export const formatDate = (
  date: string | undefined,
  includeTime?: boolean | undefined,
) => {
  if (!date) return '';

  const formattedDate = new Date(date);
  return includeTime
    ? formattedDate.toLocaleString()
    : formattedDate.toLocaleString().split(',')[0];
};
