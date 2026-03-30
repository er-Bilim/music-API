import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import Container from '../Container/Container';

const Header = () => {
  return (
    <>
      <header className={styles.header}>
        <Container>
          <div className={styles.header_content}>
            <Link to={'/'} className={styles.logo_name}>
              Music
            </Link>
          </div>
        </Container>
      </header>
    </>
  );
};

export default Header;
