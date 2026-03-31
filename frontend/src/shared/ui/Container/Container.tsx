import type { FC, PropsWithChildren } from 'react';
import classes from './Container.module.css';

const Container: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <div className={classes.container}>{children}</div>
    </>
  );
};

export default Container;
