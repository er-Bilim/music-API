import type { FC } from 'react';
import type { IAlbum } from '../../model/album.types';
import classes from './AlbumCard.module.css';
import AlbumCover from '../AlbumCover/AlbumCover';
import AlbumInfo from '../AlbumInfo/AlbumInfo';
import { motion } from 'motion/react';
import { childVariants } from './animation';

interface IAlbumCardProps {
  album: IAlbum;
}

const AlbumCard: FC<IAlbumCardProps> = ({ album }) => {
  return (
    <>
      <motion.div
        className={classes.album_card}
        initial="initial"
        whileHover="hovered"
      >
        <motion.div className={classes.album_cover} variants={childVariants}>
          <AlbumCover cover={album.image} name={album.name} />
        </motion.div>
        <div className={classes.album_info}>
          <AlbumInfo
            name={album.name}
            release_year={album.release_year}
            trackCount={album.trackCount}
          />
        </div>
      </motion.div>
    </>
  );
};

export default AlbumCard;
