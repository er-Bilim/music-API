import type { FC } from 'react';
import type { ITrack } from '../../model/track.types';
import classes from './TrackCard.module.css';
import TrackName from '../TrackName/TrackName';
import TrackNumber from '../TrackNumber/TrackNumber';
import TrackTime from '../TrackTime/TrackTime';

interface ITrackCardProps {
  track: ITrack;
}

const TrackCard: FC<ITrackCardProps> = ({ track }) => {
  return (
    <>
      <div className={classes.track_card}>
        <div className={classes.track_info}>
          <div className={classes.track_numeric}>
            <TrackNumber trackNumber={track.trackNumber} />
          </div>
          <div className={classes.track_info_content}>
            <div className={classes.track_name}>
              <TrackName name={track.name} />
            </div>
            <div className={classes.track_time}>
              <TrackTime time={track.time} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrackCard;
