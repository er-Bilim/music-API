import {
  forwardRef,
  type MouseEventHandler,
  type PropsWithChildren,
} from 'react';
import classes from './Button.module.css';

interface IButtonProps extends PropsWithChildren {
  title: string;
  text: string;
  type?: 'submit' | 'reset' | 'button';
  disabled: boolean;
  onClick: MouseEventHandler;
}

const Button = forwardRef<HTMLButtonElement, IButtonProps>(
  (
    { title, text, type = 'button', disabled = false, onClick, children },
    ref,
  ) => {
    return (
      <button
        title={title}
        type={type}
        onClick={onClick}
        className={classes.button}
        disabled={disabled}
        ref={ref}
      >
        {text}
        {children}
      </button>
    );
  },
);

export default Button;
