import type { FC } from 'react';
import { formatDate } from '../../../../shared/lib/date/formatDate';

interface ITrackHistoryDateProps {
  date: string;
}

const TrackHistoryDate: FC<ITrackHistoryDateProps> = ({ date }) => {
  return <p>{formatDate(date)}</p>;
};

export default TrackHistoryDate;
