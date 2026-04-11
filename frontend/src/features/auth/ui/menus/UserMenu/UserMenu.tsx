import { NavLink } from 'react-router-dom';
import classes from './UserMenu.module.css';
import { motion } from 'motion/react';
import { animationButton } from '../animation';

const UserMenu = () => {
  return (
    <>
      <motion.ul className={classes.nav_items}>
        <motion.li className={classes.nav_item} {...animationButton}>
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
        </motion.li>
        <motion.li className={classes.nav_item} {...animationButton}>
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
        </motion.li>
        <motion.li className={classes.nav_item} {...animationButton}>
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
        </motion.li>
        <motion.li className={classes.nav_item} {...animationButton}>
          <NavLink
            to={'/create-track'}
            className={({ isActive }) =>
              isActive
                ? `${classes.nav_item_link} ${classes.active}`
                : `${classes.nav_item_link}`
            }
          >
            create track
          </NavLink>
        </motion.li>
      </motion.ul>
    </>
  );
};

export default UserMenu;
