import type { FC } from 'react';
import type { ITrack } from '../../model/track.types';
import classes from './TrackCard.module.css';
import TrackInfo from '../TrackInfo/TrackInfo';

interface ITrackCardProps {
  track: ITrack;
}

const TrackCard: FC<ITrackCardProps> = ({ track }) => {
  return (
    <>
      <div className={classes.track_card}>
        <TrackInfo
          name={track.name}
          time={track.time}
          trackNumber={track.trackNumber}
        />
      </div>
    </>
  );
};

export default TrackCard;
