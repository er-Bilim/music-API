import type React from 'react';
import classes from './Backdrop.module.css';
import type { MouseEventHandler } from 'react';

interface IBackdropProps {
  onClose: MouseEventHandler;
}

const Backdrop: React.FC<IBackdropProps> = ({ onClose }) => {
  return <div className={classes.backdrop} onClick={onClose}></div>;
};

export default Backdrop;
