import type { MotionNodeOptions } from 'motion';

export const animationButton: MotionNodeOptions = {
  initial: {
    backgroundColor: 'var(--grey-50)',
    color: 'var(--grey-900)',
  },
  whileHover: {
    backgroundColor: 'var(--pink-500)',
    color: 'var(--grey-50)',
  },
  transition: {
    duration: 0.3,
  },
};
