import type { FC } from 'react';
import classes from './TrackInfo.module.css';

interface ITrackInfoProps {
  name: string;
  time: string;
  trackNumber: number;
}

const TrackInfo: FC<ITrackInfoProps> = ({ name, time, trackNumber }) => {
  return (
    <>
      <div className={classes.track}>
        <div className={classes.track_info}>
          <div className={classes.track_info_block}>
            <p className={classes.track_info_number}>{trackNumber}</p>
            <p className={classes.track_info_name}>{name}</p>
          </div>
          <p>{time}</p>
        </div>
      </div>
    </>
  );
};

export default TrackInfo;
