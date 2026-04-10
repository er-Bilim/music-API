import type { FC } from 'react';
import type { IArtist } from '../../model/artist.types';
import ArtistAvatar from '../ArtistAvatar/ArtistAvatar';
import ArtistName from '../ArtistName/ArtistName';
import classes from './ArtistCard.module.css';
import { motion } from 'motion/react';
import { animationConfigAvatar } from './animation';

interface IArtistCardProps {
  artist: IArtist;
}

const ArtistCard: FC<IArtistCardProps> = ({ artist }) => {
  return (
    <>
      <div className={classes.artist_card}>
        <motion.div
          className={classes.artist_avatar_block}
          {...animationConfigAvatar}
        >
          <div className={classes.artist_avatar}>
            <ArtistAvatar avatar={artist.image} name={artist.name} />
          </div>
        </motion.div>
        <div className={classes.artist_info}>
          <ArtistName name={artist.name} />
        </div>
      </div>
    </>
  );
};

export default ArtistCard;
