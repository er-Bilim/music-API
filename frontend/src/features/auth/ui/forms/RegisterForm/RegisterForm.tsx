import classes from '../AuthForm.module.css';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { IRegister } from '../../../../../entities/user/model/user.types';
import { useUserStore } from '../../../../../entities/user/model/userStore';
import Title from '../../../../../shared/ui/Title/Title';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUp } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const schemaRegister = z.object({
  username: z
    .string()
    .trim()
    .min(3, { message: 'Username must be at least 3 characters long!' })
    .max(12, { message: 'Username must be at most 12 characters long!' })
    .regex(
      /^[a-zA-Z0-9]+$/,
      'Your username must contain only letters and numbers!',
    ),
  password: z
    .string()
    .trim()
    .min(8, { message: 'Password must be at least 8 characters long!' })
    .max(32, { message: 'Password must be at most 32 characters long!' }),
});

type RegisterFormData = z.infer<typeof schemaRegister>;

const RegisterForm = () => {
  const navigate = useNavigate();
  const { registerUser, registerLoading } = useUserStore((state) => state);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(schemaRegister),
  });

  const registerSubmit = async (data: IRegister) => {
    try {
      await registerUser(data).then(() => navigate('/'));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={classes.form_block}>
        <div className={classes.form_icon}>
          <FontAwesomeIcon icon={faCircleUp} />
        </div>
        <div className={classes.form_title}>
          <Title title="Sign up" />
        </div>
        <form onSubmit={handleSubmit(registerSubmit)}>
          <div className={classes.form_inputs_block}>
            <div className={classes.form_input_content}>
              <label htmlFor="username" className={classes.form_}>
                Username
              </label>
              <input
                id="username"
                className={classes.form_input}
                type="text"
                {...register('username')}
                placeholder="Username"
              />
              {errors.username && (
                <p className={classes.form_input_error}>
                  {errors.username.message}
                </p>
              )}
            </div>
            <div className={classes.form_input_content}>
              <label htmlFor="password" className={classes.form_}>
                Password
              </label>
              <input
                id="password"
                className={classes.form_input}
                type="password"
                {...register('password')}
                placeholder="Password"
                autoComplete="on"
              />
              {errors.password && (
                <p className={classes.form_input_error}>
                  {errors.password.message}
                </p>
              )}
            </div>
            <button
              className={classes.form_submit_button}
              type="submit"
              disabled={registerLoading}
            >
              sign up
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterForm;
