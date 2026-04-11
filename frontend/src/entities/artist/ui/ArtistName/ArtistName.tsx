import type { FC } from 'react';
import classes from './ArtistName.module.css';

interface IArtistNameProps {
  name: string;
}

const ArtistName: FC<IArtistNameProps> = ({ name }) => {
  return (
    <>
      <p className={classes.artist_name}>{name}</p>
    </>
  );
};

export default ArtistName;
