import type { FC } from 'react';
import classes from './UserName.module.css';

interface IUserNameProps {
  username: string;
}

const UserName: FC<IUserNameProps> = ({ username }) => {
  return <p className={classes.username}>{username}</p>;
};

export default UserName;
