import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <>
      <div className={styles.not_found}>
        <p className={styles.not_found_text}>404. Page not found</p>
        <Link to="/" className={styles.not_found_link}>
          Go back
        </Link>
      </div>
    </>
  );
};

export default NotFound;
