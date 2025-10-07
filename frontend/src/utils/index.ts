export const formatDateWithOrdinal = (isoString: string): string => {
  const date = new Date(isoString);
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'long' });
  const year = date.getFullYear();
  
  const suffix = [11, 12, 13].includes(day) ? 'th' : 
    ['st', 'nd', 'rd'][(day % 10) - 1] || 'th';
  
  return `${day}${suffix} ${month} ${year}`;
};
