import type { FC } from 'react';
import type { IArtist } from '../../model/artist.types';
import ArtistAvatar from '../ArtistAvatar/ArtistAvatar';
import ArtistName from '../ArtistName/ArtistName';
import styles from './ArtistCard.module.css';
import { motion } from 'motion/react';
import { animationConfigAvatar, animationConfigCard } from './animation';

interface IArtistCardProps {
  artist: IArtist;
}

const ArtistCard: FC<IArtistCardProps> = ({ artist }) => {
  return (
    <>
      <motion.div className={styles.artist_card} {...animationConfigCard}>
        <motion.div
          className={styles.artist_avatar_block}
          {...animationConfigAvatar}
        >
          <div className={styles.artist_avatar}>
            <ArtistAvatar avatar={artist.image} name={artist.name} />
          </div>
        </motion.div>
        <div className={styles.artist_info}>
          <ArtistName name={artist.name} />
        </div>
      </motion.div>
    </>
  );
};

export default ArtistCard;
