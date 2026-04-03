import { NavLink } from 'react-router-dom';
import classes from './AnonymousMenu.module.css';

const AnonymousMenu = () => {
  return (
    <>
      <ul className={classes.nav_items}>
        <li className={classes.nav_item}>
          <NavLink
            to={'/login'}
            className={({ isActive }) =>
              isActive
                ? `${classes.nav_item_link} ${classes.active}`
                : `${classes.nav_item_link}`
            }
          >
            sign in
          </NavLink>
        </li>
        <li className={classes.nav_item}>
          <NavLink
            to={'/signup'}
            className={({ isActive }) =>
              isActive
                ? `${classes.nav_item_link} ${classes.active}`
                : `${classes.nav_item_link}`
            }
          >
            sign up
          </NavLink>
        </li>
      </ul>
    </>
  );
};

export default AnonymousMenu;
