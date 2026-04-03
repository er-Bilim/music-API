import RegisterForm from '../../features/auth/ui/forms/RegisterForm/RegisterForm';
import classes from './RegisterPage.module.css';

const RegisterPage = () => {
  return (
    <div className={classes.register_block}>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
