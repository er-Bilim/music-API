import { useUserStore } from '../../../../../entities/user/model/userStore';
import UserMenu from '../UserMenu/UserMenu';
import AnonymousMenu from '../AnonymousMenu/AnonymousMenu';

const AuthMenu = () => {
  const { user } = useUserStore((state) => state);

  const renderMenu = () => {
    if (user) {
      return (
        <>
          <UserMenu />
        </>
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
      <nav>{renderMenu()}</nav>
    </>
  );
};

export default AuthMenu;
