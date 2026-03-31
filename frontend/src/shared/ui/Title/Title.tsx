import type { FC } from 'react';
import classes from './Title.module.css';

interface ITitleProps {
  title: string;
}

const Title: FC<ITitleProps> = ({ title }) => {
  return <p className={classes.title}>{title}</p>;
};

export default Title;
