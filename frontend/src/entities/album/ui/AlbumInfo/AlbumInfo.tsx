import type { FC } from 'react';
import classes from './AlbumInfo.module.css';

interface IAlbumInfoProps {
  name: string;
  release_year: number;
  trackCount?: number;
}

const AlbumInfo: FC<IAlbumInfoProps> = ({ name, release_year, trackCount }) => {
  return (
    <div className={classes.album_info}>
      <p className={classes.album_info_name}>{name}</p>
      <p className={classes.album_info_year}>Release Year {release_year}</p>
      {trackCount && (
        <p className={classes.album_info_tracks}>Tracks {trackCount}</p>
      )}
    </div>
  );
};

export default AlbumInfo;
