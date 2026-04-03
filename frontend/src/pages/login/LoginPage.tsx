import LoginForm from '../../features/auth/ui/forms/LoginForm/LoginForm';
import classes from './LoginPage.module.css';

const LoginPage = () => {
  return (
    <div className={classes.login_block}>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
