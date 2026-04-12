import classes from './PublishAlbum.module.css';
import type { MotionNodeOptions } from 'motion';
import { motion } from 'motion/react';
import Button from '../../../../shared/ui/Button/Button';
import type { FC } from 'react';
import { useAlbumStore } from '../../../../entities/album/model/albumStore';

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

interface ITogglePublishedAlbumProps {
  id: string;
}

const PublishAlbum: FC<ITogglePublishedAlbumProps> = ({ id }) => {
  const { togglePublishAlbum, updateLoading } = useAlbumStore((state) => state);

  return (
    <motion.div className={classes.publish_album} {...animationButton}>
      <Button
        title="Publish"
        text="Publish"
        type="button"
        onClick={() => togglePublishAlbum(id)}
        disabled={updateLoading}
      />
    </motion.div>
  );
};

export default PublishAlbum;
