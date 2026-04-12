import classes from './DeleteTrack.module.css';
import type { MotionNodeOptions } from 'motion';
import { motion } from 'motion/react';
import Button from '../../../../shared/ui/Button/Button';
import type { FC } from 'react';
import { useTracksStore } from '../../../../entities/track/model/trackStore';

const animationButton: MotionNodeOptions = {
  initial: {
    backgroundColor: 'var(--red-100)',
    color: 'var(--red-500)',
    border: '1px solid var(--red-500)',
  },

  whileHover: {
    backgroundColor: 'var(--red-500)',
    color: 'var(--red-100)',
    border: '1px solid var(--red-100)',
  },

  transition: {
    duration: 0.3,
  },
};

interface IDeleteTrackProps {
  id: string;
}

const DeleteTrack: FC<IDeleteTrackProps> = ({ id }) => {
  const { deleteTrack, deleteLoading } = useTracksStore((state) => state);

  return (
    <motion.div className={classes.delete_track} {...animationButton}>
      <Button
        title="Delete"
        text="Delete"
        type="button"
        onClick={() => deleteTrack(id)}
        disabled={deleteLoading}
      />
    </motion.div>
  );
};

export default DeleteTrack;
