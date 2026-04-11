import { NavLink } from 'react-router-dom';
import classes from './UserMenu.module.css';
import { motion } from 'motion/react';
import { animationButton } from '../animation';

const NavLinkMotion = motion.create(NavLink);

const UserMenu = () => {
  return (
    <>
      <ul className={classes.nav_items}>
        <li className={classes.nav_item}>
          <NavLinkMotion
            {...animationButton}
            to={'/track-history'}
            className={({ isActive }) =>
              isActive
                ? `${classes.nav_item_link} ${classes.active}`
                : `${classes.nav_item_link}`
            }
          >
            track history
          </NavLinkMotion>
        </li>
        <li className={classes.nav_item}>
          <NavLinkMotion
            {...animationButton}
            to={'/create-artist'}
            className={({ isActive }) =>
              isActive
                ? `${classes.nav_item_link} ${classes.active}`
                : `${classes.nav_item_link}`
            }
          >
            create artist
          </NavLinkMotion>
        </li>
        <li className={classes.nav_item}>
          <NavLinkMotion
            {...animationButton}
            to={'/create-album'}
            className={({ isActive }) =>
              isActive
                ? `${classes.nav_item_link} ${classes.active}`
                : `${classes.nav_item_link}`
            }
          >
            create album
          </NavLinkMotion>
        </li>
        <li className={classes.nav_item}>
          <NavLinkMotion
            {...animationButton}
            to={'/create-track'}
            className={({ isActive }) =>
              isActive
                ? `${classes.nav_item_link} ${classes.active}`
                : `${classes.nav_item_link}`
            }
          >
            create track
          </NavLinkMotion>
        </li>
      </ul>
    </>
  );
};

export default UserMenu;
