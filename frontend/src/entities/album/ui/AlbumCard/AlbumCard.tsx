import type { FC } from 'react';
import type { IAlbum } from '../../model/album.types';
import classes from './AlbumCard.module.css';
import AlbumCover from '../AlbumCover/AlbumCover';
import { motion } from 'motion/react';
import { animationAlbumCard } from './animation';
import AlbumName from '../AlbumName/AlbumName';
import AlbumReleaseYear from '../AlbumReleaseYear/AlbumReleaseYear';
import AlbumTrackCount from '../AlbumTrackCount/AlbumTrackCount';

interface IAlbumCardProps {
  album: IAlbum;
}

const AlbumCard: FC<IAlbumCardProps> = ({ album }) => {
  return (
    <>
      <motion.div className={classes.album_card} {...animationAlbumCard}>
        <div className={classes.album_cover}>
          <AlbumCover cover={album.image} name={album.name} />
        </div>
        <div className={classes.album_info}>
          <div className={classes.album_info_name}>
            <AlbumName name={album.name} />
          </div>
          <div className={classes.album_info_release_year}>
            <AlbumReleaseYear release_year={album.release_year} />
          </div>
          <div className={classes.album_info_track_count}>
            <AlbumTrackCount trackCount={album.trackCount} />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default AlbumCard;
