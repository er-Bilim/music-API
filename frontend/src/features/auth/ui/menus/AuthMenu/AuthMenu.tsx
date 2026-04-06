import { useUserStore } from '../../../../../entities/user/model/userStore';
import UserMenu from '../UserMenu/UserMenu';
import AnonymousMenu from '../AnonymousMenu/AnonymousMenu';
import UserAvatar from '../../../../../shared/ui/user/UserAvatar/UserAvatar';
import UserName from '../../../../../shared/ui/user/UserName/UserName';
import classes from './AuthMenu.module.css';

const AuthMenu = () => {
  const { user, logoutUser } = useUserStore((state) => state);

  const renderMenu = () => {
    if (user) {
      return (
        <div className={classes.user_block}>
          <UserMenu />
          <div className={classes.user_menu_content}>
            <div className={classes.user_info}>
              <UserAvatar avatar={user.user.username} />
              <UserName username={user.user.username} />
            </div>
            <button
              className={classes.logout_button}
              type="button"
              onClick={logoutUser}
            >
              logout
            </button>
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
      <nav className={classes.nav}>{renderMenu()}</nav>
    </>
  );
};

export default AuthMenu;
