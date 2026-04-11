import type { FC } from 'react';
import classes from './TrackTime.module.css';

interface ITrackTimeProps {
  time: string;
}

const TrackTime: FC<ITrackTimeProps> = ({ time }) => {
  return <p className={classes.track_time}>{time}</p>;
};

export default TrackTime;
