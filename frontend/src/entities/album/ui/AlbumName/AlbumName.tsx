import type { FC } from 'react';
import classes from './AlbumName.module.css';

interface IAlbumNameProps {
  name: string;
}

const AlbumName: FC<IAlbumNameProps> = ({ name }) => {
  return <p className={classes.album_name}>{name}</p>;
};

export default AlbumName;
