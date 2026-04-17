import type { FC } from 'react';
import classes from './UserAvatar.module.css';

interface IUserAvatarProps {
  avatar: string;
}

const UserAvatar: FC<IUserAvatarProps> = ({ avatar }) => {
  return (
    <div className={classes.avatar_block}>
      <img src={`${avatar}`} alt={'your avatar'} className={classes.avatar} />
    </div>
  );
};

export default UserAvatar;
