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
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollY);
    };
  });

  return (
    <div className={classes.modal}>
      <div className={classes.close_modal} onClick={handleModal}></div>
      <div className={classes.modal_content}>{children}</div>
    </div>
  );
};

export default Modal;
