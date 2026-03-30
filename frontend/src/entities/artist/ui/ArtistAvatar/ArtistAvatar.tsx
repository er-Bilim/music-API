import type { FC } from 'react';
import styles from './ArtistAvatar.module.css';
import { API_URL } from '../../../../shared/constants/constants';
import AVATAR_PLACEHOLDER from '../../../../assets/images/placeholder/avatar_placeholder.png';

interface IArtistAvatarProps {
  avatar: string;
  name: string;
}

const ArtistAvatar: FC<IArtistAvatarProps> = ({ avatar, name }) => {
  const imageURL: string = avatar ? `${API_URL}/${avatar}` : AVATAR_PLACEHOLDER;

  const renderImage = () => {
    return (
      <>
        <img src={imageURL} alt={name} className={styles.artist_avatar}/>
      </>
    );
  };

  return (
    <>
      <div className={styles.artist_avatar_block}>{renderImage()}</div>
    </>
  );
};

export default ArtistAvatar;
