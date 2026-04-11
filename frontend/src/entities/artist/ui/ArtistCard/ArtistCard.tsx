import type { FC } from 'react';
import type { IArtist } from '../../model/artist.types';
import ArtistAvatar from '../ArtistAvatar/ArtistAvatar';
import ArtistName from '../ArtistName/ArtistName';
import classes from './ArtistCard.module.css';
import { motion } from 'motion/react';
import { animationArtistCard } from './animation';

interface IArtistCardProps {
  artist: IArtist;
}

const ArtistCard: FC<IArtistCardProps> = ({ artist }) => {
  return (
    <>
      <motion.div className={classes.artist_card} {...animationArtistCard}>
        <div className={classes.artist_avatar_block}>
          <div className={classes.artist_avatar}>
            <ArtistAvatar avatar={artist.image} name={artist.name} />
          </div>
        </div>
        <div className={classes.artist_name}>
          <ArtistName name={artist.name} />
        </div>
      </motion.div>
    </>
  );
};

export default ArtistCard;
