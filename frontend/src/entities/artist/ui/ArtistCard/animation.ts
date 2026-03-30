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

export const animationConfigCard: MotionNodeOptions = {
  initial: {
    top: '50px',
  },
  animate: {
    top: '0px',
  },
  transition: {
    duration: 0.7,
  },
};
