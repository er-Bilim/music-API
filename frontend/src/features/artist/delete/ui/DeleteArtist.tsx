import type { FC } from 'react';
import { useArtistStore } from '../../../../entities/artist/model/artistStore';
import Button from '../../../../shared/ui/Button/Button';
import type { MotionNodeOptions } from 'motion';
import { motion } from 'motion/react';
import classes from './DeleteArtist.module.css';

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

interface IDeleteArtistProps {
  id: string;
}

const DeleteArtist: FC<IDeleteArtistProps> = ({ id }) => {
  const { deleteArtist, deleteLoading } = useArtistStore((state) => state);

  return (
    <motion.div className={classes.delete_artist} {...animationButton}>
      <Button
        title="Delete"
        text="Delete"
        type="button"
        onClick={() => deleteArtist(id)}
        disabled={deleteLoading}
      />
    </motion.div>
  );
};

export default DeleteArtist;
