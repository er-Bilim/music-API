import type { MotionNodeOptions } from 'motion';

export const animationArtistCard: MotionNodeOptions = {
  initial: {
    backgroundColor: 'var(--grey-50)',
    border: `1px solid var(--grey-50)`,
  },
  whileHover: {
    backgroundColor: 'color-mix(in srgb, var(--pink-500), transparent 85%)',
    border: `1px solid var(--pink-500)`,
  },
  transition: {
    duration: 0.3,
  },
};
