import type { FC } from 'react';
import classes from './ArtistAvatar.module.css';
import { API_URL } from '../../../../shared/constants/constants';
import AVATAR_PLACEHOLDER from '../../../../assets/images/placeholder/avatar_placeholder.png';

interface IArtistAvatarProps {
  avatar: string;
  name: string;
}

const ArtistAvatar: FC<IArtistAvatarProps> = ({ avatar, name }) => {
  const imageURL: string = avatar ? `${API_URL}/${avatar}` : AVATAR_PLACEHOLDER;

  return (
    <>
      <div className={classes.artist_avatar_block}>
        <img src={imageURL} alt={name} className={classes.artist_avatar} />
      </div>
    </>
  );
};

export default ArtistAvatar;
