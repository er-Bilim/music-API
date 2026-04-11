import { useUserStore } from '../../../../../entities/user/model/userStore';
import UserMenu from '../UserMenu/UserMenu';
import AnonymousMenu from '../AnonymousMenu/AnonymousMenu';
import UserAvatar from '../../../../../shared/ui/user/UserAvatar/UserAvatar';
import UserName from '../../../../../shared/ui/user/UserName/UserName';
import classes from './AuthMenu.module.css';
import Container from '../../../../../shared/ui/Container/Container';
import { motion } from 'motion/react';
import { animationButton } from '../animation';
import { Link } from 'react-router-dom';

const LinkMotion = motion.create(Link);

const AuthMenu = () => {
  const { user, logoutUser } = useUserStore((state) => state);

  const renderMenu = () => {
    if (user) {
      return (
        <div className={classes.user_block}>
          <UserMenu />
          <div className={classes.user_menu_content}>
            <LinkMotion
              className={classes.logout_button}
              to={'/'}
              onClick={logoutUser}
              {...animationButton}
            >
              logout
            </LinkMotion>
            <div className={classes.user_info}>
              <UserAvatar avatar={user.user.username} />
              <UserName username={user.user.username} />
            </div>
          </div>
        </div>
      );
    }

    return (
      <>
        <AnonymousMenu />
      </>
    );
  };

  return (
    <>
      <nav className={classes.nav}>
        <Container>{renderMenu()}</Container>
      </nav>
    </>
  );
};

export default AuthMenu;
