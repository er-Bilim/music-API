import type { FC } from 'react';
import classes from './Status.module.css';

interface IStatusProps {
  status: boolean;
}

const Status: FC<IStatusProps> = ({ status }) => {
  return (
    <>
      <div
        className={`${classes.status} ${status ? classes.published : classes.not_published}`}
      >
        <p className={classes.status_text}>
          {status ? 'published' : 'not published'}
        </p>
      </div>
    </>
  );
};

export default Status;
