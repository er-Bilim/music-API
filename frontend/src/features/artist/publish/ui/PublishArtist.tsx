import type { FC } from 'react';
import { useArtistStore } from '../../../../entities/artist/model/artistStore';
import Button from '../../../../shared/ui/Button/Button';
import classes from './PublishArtist.module.css';
import type { MotionNodeOptions } from 'motion';
import { motion } from 'motion/react';

const animationButton: MotionNodeOptions = {
  initial: {
    backgroundColor: 'var(--teal-100)',
    color: 'var(--teal-500)',
    border: '1px solid var(--teal-500)',
  },

  whileHover: {
    backgroundColor: 'var(--teal-500)',
    color: 'var(--teal-100)',
    border: '1px solid var(--teal-100)',
  },

  transition: {
    duration: 0.3,
  },
};

interface ITogglePublishedArtistProps {
  id: string;
}

const TogglePublishedArtist: FC<ITogglePublishedArtistProps> = ({ id }) => {
  const { togglePublishArtist, updateLoading } = useArtistStore(
    (state) => state,
  );

  return (
    <motion.div className={classes.publish_artist} {...animationButton}>
      <Button
        title="Publish"
        text="Publish"
        type="button"
        onClick={() => togglePublishArtist(id)}
        disabled={updateLoading}
      />
    </motion.div>
  );
};

export default TogglePublishedArtist;
