import classes from '../AuthForm.module.css';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { IRegister } from '../../../../../entities/user/model/user.types';
import { useUserStore } from '../../../../../entities/user/model/userStore';
import Title from '../../../../../shared/ui/Title/Title';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUp } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import LoginGoogleButton from '../../loginGoogle/ui/loginGoogleButton/LoginGoogleButton';
import { schemaRegister, type RegisterFormData } from './lib/validation';
import type { ChangeEvent } from 'react';
import FileInput from '../../../../../shared/ui/FileInput/FileInput';

const RegisterForm = () => {
  const navigate = useNavigate();
  const { registerUser, registerLoading } = useUserStore((state) => state);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
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

  const onChangeFileHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;

    if (files && files[0] && name === 'image') {
      setValue(name, files[0]);
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
            <div
              className={`${classes.form_input_content} ${classes.form_input_content_avatar}`}
            >
              <label htmlFor="avatar" className={classes.form_input_label}>
                Avatar
              </label>
              <div className={classes.form_input_file}>
                <FileInput
                  label="Artist Photo"
                  {...register('image')}
                  onChange={onChangeFileHandler}
                />
                {errors.image && (
                  <p className={classes.form_input_error}>
                    {errors.image.message}
                  </p>
                )}
              </div>
            </div>
            <div className={classes.form_input_content}>
              <label htmlFor="displayname" className={classes.form_}>
                Display name
              </label>
              <input
                id="displayname"
                className={classes.form_input}
                type="text"
                {...register('displayName')}
                placeholder="Display name"
              />
              {errors.displayName && (
                <p className={classes.form_input_error}>
                  {errors.displayName.message}
                </p>
              )}
            </div>
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

            <LoginGoogleButton type={'signup_with'} />
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterForm;
