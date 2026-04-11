import { Link } from 'react-router-dom';
import classes from './Header.module.css';
import Container from '../Container/Container';
import AuthMenu from '../../../features/auth/ui/menus/AuthMenu/AuthMenu';

const Header = () => {
  return (
    <>
      <header className={classes.header}>
        <Container>
          <div className={classes.header_content}>
            <Link to={'/'} className={classes.logo}>
              <img
                src="/music_logo.png"
                alt="logo"
                className={classes.logo_image}
              />
              <p className={classes.logo_name}>Music</p>
            </Link>
          </div>
        </Container>
        <div className={classes.header_menu}>
          <AuthMenu />
        </div>
      </header>
    </>
  );
};

export default Header;
