import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../../hooks/user';
import { GeneralButton } from '../../components/shared/Button';
import { t } from '../../helpers/i18n';
import { showError, showSuccess } from '../../utils/messageRender';
import Breadcrumb from '../../components/shared/Breadcrumb';

const RequestPasswordResetPage: React.FC = () => {
  const navigate = useNavigate();
  const { requestPasswordReset, loading } = useUser();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email
    if (!email.trim()) {
      setError(t('auth.emailRequired'));
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(t('auth.invalidEmail'));
      return;
    }

    const success = await requestPasswordReset(email);

    if (success) {
      setSubmitted(true);
      showSuccess(t('auth.resetEmailSent'));
    } else {
      showError(t('auth.resetEmailFailed'));
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: t('breadcrumb.home'), path: '/' },
          { label: t('breadcrumb.login'), path: '/login' },
          {
            label: t('breadcrumb.forgotPassword'),
            path: '/request-password-reset',
          },
        ]}
      />
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {t('auth.resetPassword')}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-[12px] sm:px-10">
          {submitted ? (
            <div className="text-center">
              <div className="rounded-full bg-green-100 p-3 mx-auto w-16 h-16 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                {t('auth.checkYourEmail')}
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                {t('auth.resetEmailInstructions')}
              </p>
              <div className="mt-6">
                <GeneralButton
                  type="button"
                  variant="outline"
                  className="w-full rounded-[10px]"
                  onClick={() => navigate('/login')}
                >
                  {t('auth.backToLogin')}
                </GeneralButton>
              </div>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t('auth.email')}
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={handleEmailChange}
                    className={`appearance-none block w-full px-3 py-2 border ${
                      error ? 'border-red-300' : 'border-gray-300'
                    } rounded-[10px] shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    placeholder={t('auth.enterYourEmail')}
                  />
                  {error && (
                    <p className="mt-2 text-sm text-red-600">{error}</p>
                  )}
                </div>
              </div>

              <div>
                <GeneralButton
                  type="submit"
                  variant="primary"
                  className="w-full rounded-[10px]"
                  disabled={loading}
                >
                  {loading ? t('lbl.loading') : t('auth.sendResetLink')}
                </GeneralButton>
              </div>

              <div className="flex items-center justify-center">
                <div className="text-sm">
                  <Link
                    to="/login"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    {t('auth.backToLogin')}
                  </Link>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestPasswordResetPage;
