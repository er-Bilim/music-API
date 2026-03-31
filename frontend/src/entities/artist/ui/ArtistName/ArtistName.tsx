import type { FC } from 'react';
import classes from './ArtistName.module.css';

interface IArtistNameProps {
  name: string;
}

const ArtistName: FC<IArtistNameProps> = ({ name }) => {
  return (
    <>
      <div className={classes.artist_name_block}>
        <p className={classes.artist_name}>{name}</p>
      </div>
    </>
  );
};

export default ArtistName;
