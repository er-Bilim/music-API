import type { FC } from 'react';
import classes from './AlbumReleaseYear.module.css';

interface IAlbumReleaseYearProps {
  release_year: number;
}

const AlbumReleaseYear: FC<IAlbumReleaseYearProps> = ({ release_year }) => {
  return (
    <p className={classes.release_year}>{release_year}</p>
  );
};

export default AlbumReleaseYear;
