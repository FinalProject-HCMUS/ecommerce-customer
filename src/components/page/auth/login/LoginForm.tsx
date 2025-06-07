import React, { useState } from 'react';
import InputField from '../../../shared/form/InputField';
import PasswordInput from '../../../shared/form/PasswordInput';
import SocialLoginButton from './SocialLoginButton';
import Divider from '../../../shared/Divider';
import { GeneralButton } from '../../../shared/Button'; // Import the reusable Button component
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../../hooks/auth';
import { messageRenderUtils } from '../../../../utils';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../../../context/authSlice';
import { useUser } from '../../../../hooks/user';
import { t } from '../../../../helpers/i18n';
import storageConstants from '../../../../constants/localStorage';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser, loading } = useAuth(); // Use the loginUser function and loading state
  const { fetchUserByToken } = useUser();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const tokenResponse = await loginUser({ email, password });

    if (!tokenResponse) return;

    localStorage.setItem(storageConstants.TOKEN, tokenResponse.accessToken);

    const user = await fetchUserByToken();

    if (!user) return;

    dispatch(
      login({
        userInfo: user,
        accessToken: tokenResponse.accessToken,
        refreshAccessToken: tokenResponse.refreshToken,
      })
    );
    messageRenderUtils.showSuccess(t('success.loginSuccess'));
    navigate('/');
  };

  const handleLoginGoogle = (): void => {
    const callbackUrl = import.meta.env.VITE_REDIRECT_URI;
    const authUrl = import.meta.env.VITE_AUTH_URI;
    const googleClientId = import.meta.env.VITE_CLIENT_ID;

    const targetUrl = `${authUrl}?redirect_uri=${encodeURIComponent(
      callbackUrl
    )}&response_type=code&client_id=${googleClientId}&scope=openid%20email%20profile`;
    window.location.href = targetUrl;
  };

  return (
    <>
      <h1 className="text-center text-2xl font-bold text-gray-900">
        {t('lbl.login')}
      </h1>
      <form onSubmit={handleSubmit}>
        <InputField
          id={t('lbl.email')}
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('placeholder.email')}
          required
        />

        <PasswordInput
          id="password"
          label={t('lbl.password')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t('placeholder.password')}
          forgotPasswordLink="/request-password-reset"
          required
        />

        <GeneralButton
          type="submit"
          variant="primary"
          size="md"
          isLoading={loading} // Show loading spinner when submitting
          className="w-full rounded-[10px]"
        >
          {t('btn.login')}
        </GeneralButton>
      </form>

      <div className="mt-4 flex items-center justify-between">
        <div className="mt-4 text-center">
          <Link
            to="/activate-account"
            className="text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            {t('hyperlink.activateAccount')}
          </Link>
        </div>
        <div className="mt-4 text-center text-sm text-gray-500">
          {t('lbl.notRegistered')}
          <Link
            to="/register"
            className="ml-1 font-medium text-blue-600 hover:text-blue-500"
          >
            {t('hyperlink.register')}
          </Link>
        </div>
      </div>

      <Divider text={t('lbl.or')} className="my-6" />

      <div className="mt-6 grid grid-cols-1 gap-3">
        <SocialLoginButton
          icon={<FcGoogle className="mr-2 h-5 w-5" />}
          text="Google"
          onClick={handleLoginGoogle}
        />
      </div>
    </>
  );
};

export default LoginForm;
