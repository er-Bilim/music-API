import type { FC } from 'react';
import Button from '../../../../shared/ui/Button/Button';
import type { MotionNodeOptions } from 'motion';
import { motion } from 'motion/react';
import classes from './DeleteAlbum.module.css';
import { useAlbumStore } from '../../../../entities/album/model/albumStore';

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

interface IDeleteAlbumProps {
  id: string;
}

const DeleteAlbum: FC<IDeleteAlbumProps> = ({ id }) => {
  const { deleteAlbum, deleteLoading } = useAlbumStore((state) => state);

  return (
    <motion.div className={classes.delete_album} {...animationButton}>
      <Button
        title="Delete"
        text="Delete"
        type="button"
        onClick={() => deleteAlbum(id)}
        disabled={deleteLoading}
      />
    </motion.div>
  );
};

export default DeleteAlbum;
