import type { FC } from 'react';
import styles from './ArtistName.module.css';

interface IArtistNameProps {
  name: string;
}

const ArtistName: FC<IArtistNameProps> = ({ name }) => {
  return (
    <>
      <div className={styles.artist_name_block}>
        <p className={styles.artist_name}>{name}</p>
      </div>
    </>
  );
};

export default ArtistName;
