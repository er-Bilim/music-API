import {
  useEffect,
  type FC,
  type MouseEventHandler,
  type PropsWithChildren,
} from 'react';
import classes from './Modal.module.css';

interface IModalProps extends PropsWithChildren {
  handleModal: MouseEventHandler;
}

const Modal: FC<IModalProps> = ({ children, handleModal }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className={classes.modal}>
      <div className={classes.close_modal} onClick={handleModal}></div>
      <div className={classes.modal_content}>{children}</div>
    </div>
  );
};

export default Modal;
