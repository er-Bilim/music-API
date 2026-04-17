import { GoogleLogin } from '@react-oauth/google';
import { useUserStore } from '../../../../../../entities/user/model/userStore';
import { useNavigate } from 'react-router-dom';
import type { FC } from 'react';

interface ILoginGoogleButtonProps {
  type: 'signup_with' | 'signin_with';
}

const LoginGoogleButton: FC<ILoginGoogleButtonProps> = ({ type }) => {
  const navigate = useNavigate();
  const { loginGoogle } = useUserStore((state) => state);

  const googleLoginHandler = async (credential: string | null | undefined) => {
    try {
      if (!credential) return;

      await loginGoogle(credential).then(() => navigate('/'));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <GoogleLogin
      width="700px"
      text={type}
      onSuccess={(credentialResponse) =>
        googleLoginHandler(credentialResponse.credential)
      }
    />
  );
};

export default LoginGoogleButton;
