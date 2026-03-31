import { Link } from 'react-router-dom';
import classes from './Header.module.css';
import Container from '../Container/Container';

const Header = () => {
  return (
    <>
      <header className={classes.header}>
        <Container>
          <div className={classes.header_content}>
            <Link to={'/'} className={classes.logo_name}>
              Music
            </Link>
          </div>
        </Container>
      </header>
    </>
  );
};

export default Header;
