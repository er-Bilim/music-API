import { Link } from 'react-router-dom';
import classes from './NotFound.module.css';

const NotFound = () => {
  return (
    <>
      <div className={classes.not_found}>
        <p className={classes.not_found_text}>404. Page not found</p>
        <Link to="/" className={classes.not_found_link}>
          Go back
        </Link>
      </div>
    </>
  );
};

export default NotFound;
