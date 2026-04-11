import type { MotionNodeOptions } from 'motion';

export const animationAlbumCard: MotionNodeOptions = {
  initial: {
    backgroundColor: 'var(--grey-50)',
    border: `1px solid var(--grey-50)`,
  },
  whileHover: {
    backgroundColor: 'color-mix(in srgb, var(--pink-500), transparent 95%)',
    border: `1px solid var(--pink-500)`,
  },
  transition: {
    duration: 0.3,
  },
};
