import type { FC } from 'react';
import classes from './UserAvatar.module.css';

interface IUserAvatarProps {
  avatar: string;
}

const UserAvatar: FC<IUserAvatarProps> = ({ avatar }) => {
  return (
    <div className={classes.avatar_block}>
      <p className={classes.avatar}>{avatar.at(0)}</p>
    </div>
  );
};

export default UserAvatar;
