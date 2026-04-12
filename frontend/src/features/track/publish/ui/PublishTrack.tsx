import classes from './PublishTrack.module.css';
import type { MotionNodeOptions } from 'motion';
import { motion } from 'motion/react';
import Button from '../../../../shared/ui/Button/Button';
import type { FC } from 'react';
import { useTracksStore } from '../../../../entities/track/model/trackStore';

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

interface IPublishTrackProps {
  id: string;
}

const PublishTrack: FC<IPublishTrackProps> = ({ id }) => {
  const { togglePublishTrack, updateLoading } = useTracksStore(
    (state) => state,
  );

  return (
    <motion.div className={classes.publish_track} {...animationButton}>
      <Button
        title="Publish"
        text="Publish"
        type="button"
        onClick={() => togglePublishTrack(id)}
        disabled={updateLoading}
      />
    </motion.div>
  );
};

export default PublishTrack;
