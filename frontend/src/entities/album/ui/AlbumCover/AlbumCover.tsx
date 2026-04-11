import type { FC } from 'react';
import { API_URL } from '../../../../shared/constants/constants';
import CONTENT_PLACEHOLDER from '../../../../assets/images/placeholder/content_placeholder.png';
import classes from './AlbumCover.module.css';

interface IAlbumCoverProps {
  cover: string;
  name: string;
}

const AlbumCover: FC<IAlbumCoverProps> = ({ cover, name }) => {
  const imageURL: string = cover ? `${API_URL}/${cover}` : CONTENT_PLACEHOLDER;

  return (
    <>
      <img src={imageURL} alt={name} className={classes.album_cover} />
    </>
  );
};

export default AlbumCover;
