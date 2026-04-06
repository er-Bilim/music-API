import type { FC } from 'react';
import './Alert.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

interface IAlertProps {
  type: 'error' | 'success';
  message: string;
}

const Alert: FC<IAlertProps> = ({ type, message }) => {
  return (
    <>
      <div className={`alert alert_${type}`}>
        <FontAwesomeIcon icon={faTriangleExclamation} />
        <p> {message}</p>
      </div>
    </>
  );
};

export default Alert;
