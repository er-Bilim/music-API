import type { FC } from 'react';
import classes from './AlbumTrackCount.module.css';

interface IAlbumTrackCountProps {
  trackCount: number;
}

const AlbumTrackCount: FC<IAlbumTrackCountProps> = ({ trackCount }) => {
  return (
    <p className={classes.tracks_count}>
      {trackCount && trackCount > 0 ? `${trackCount} Tracks ` : `No tracks`}
    </p>
  );
};

export default AlbumTrackCount;
