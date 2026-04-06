import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';

dayjs.extend(isToday);
dayjs.extend(isYesterday);

export const formatDate = (date: string) => {
  const d = dayjs(date);
  const now = dayjs();

  if (d.isToday()) return `Today ${d.format('HH:mm')}`;
  if (d.isYesterday()) return `Yesterday ${d.format('HH:mm')}`;

  if (d.year() !== now.year()) return d.format('DD.MM.YYYY HH:mm');
  return d.format('DD.MM HH:mm');
};