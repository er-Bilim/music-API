import type { FC } from 'react';
import ArtistName from '../../../artist/ui/ArtistName/ArtistName';
import { formatDate } from '../../../../shared/lib/date/formatDate';
import classes from './HistoryInfo.module.css';

interface IHistoryInfoProps {
  artistName: string;
  trackName: string;
  date: string;
}

const HistoryInfo: FC<IHistoryInfoProps> = ({
  artistName,
  trackName,
  date,
}) => {
  return (
    <>
      <div className={classes.info}>
        <div className={classes.info_artist}>
          Artist <ArtistName name={artistName} />
        </div>
        <p>Track {trackName}</p>
        <p>{formatDate(date)}</p>
      </div>
    </>
  );
};

export default HistoryInfo;
