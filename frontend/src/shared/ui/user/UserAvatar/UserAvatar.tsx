import type { FC } from 'react';
import classes from './UserAvatar.module.css';
import { API_URL } from '../../../constants/constants';
import ANONYMOUS_USER from '../../../../assets/images/placeholder/avatar_placeholder.png';

interface IUserAvatarProps {
  avatar: string;
}

const UserAvatar: FC<IUserAvatarProps> = ({ avatar }) => {
  const avatarURL: string = avatar ? `${API_URL}/${avatar}` : ANONYMOUS_USER;

  return (
    <img src={`${avatarURL}`} alt={'your avatar'} className={classes.avatar} />
  );
};

export default UserAvatar;
