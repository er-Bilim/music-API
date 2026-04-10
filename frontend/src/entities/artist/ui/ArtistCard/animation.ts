import type { MotionNodeOptions } from 'motion';

export const animationConfigAvatar: MotionNodeOptions = {
  initial: {
    top: '10px',
  },
  whileHover: {
    top: '0px',
  },
  transition: {
    duration: 0.3,
  },
};
