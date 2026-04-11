import type { FC } from 'react';
import classes from './TrackNumber.module.css';

interface ITrackNumberProps {
  trackNumber: number;
}

const TrackNumber: FC<ITrackNumberProps> = ({ trackNumber }) => {
  return <p className={classes.track_number}>{trackNumber}</p>;
};

export default TrackNumber;
