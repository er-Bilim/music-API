import type { FC } from 'react';
import classes from './TrackName.module.css';

interface ITrackNameProps {
  name: string;
}

const TrackName: FC<ITrackNameProps> = ({ name }) => {
  return <p className={classes.track_name}>{name}</p>;
};

export default TrackName;
