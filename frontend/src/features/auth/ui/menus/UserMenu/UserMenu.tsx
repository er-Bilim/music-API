import { NavLink } from 'react-router-dom';
import classes from './UserMenu.module.css';

const UserMenu = () => {
  return (
    <>
      <ul className={classes.nav_items}>
        <li className={classes.nav_item}>
          <NavLink
            to={'/track-history'}
            className={({ isActive }) =>
              isActive
                ? `${classes.nav_item_link} ${classes.active}`
                : `${classes.nav_item_link}`
            }
          >
            track history
          </NavLink>
        </li>
        <li className={classes.nav_item}>
          <NavLink
            to={'/create-artist'}
            className={({ isActive }) =>
              isActive
                ? `${classes.nav_item_link} ${classes.active}`
                : `${classes.nav_item_link}`
            }
          >
            create artist
          </NavLink>
        </li>
        <li className={classes.nav_item}>
          <NavLink
            to={'/create-album'}
            className={({ isActive }) =>
              isActive
                ? `${classes.nav_item_link} ${classes.active}`
                : `${classes.nav_item_link}`
            }
          >
            create album
          </NavLink>
        </li>
      </ul>
    </>
  );
};

export default UserMenu;
