import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useUser } from '../../hooks/user';
import { GeneralButton } from '../../components/shared/Button';
import { toast } from 'react-toastify';
import { t } from '../../helpers/i18n';
import Breadcrumb from '../../components/shared/Breadcrumb';
import PasswordInput from '../../components/shared/form/PasswordInput';

const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const { resetPassword, loading } = useUser();

  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
    token: token || '',
  });

  const [errors, setErrors] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  // Redirect if no token is provided
  useEffect(() => {
    if (!token) {
      toast.error(t('error.commonError'));
      navigate('/request-password-reset');
    }
  }, [token, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear errors when field is modified
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (!formData.newPassword) {
      newErrors.newPassword = t('error.passwordRequired');
      valid = false;
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = t('error.passwordLength');
      valid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = t('error.confirmPasswordRequired');
      valid = false;
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = t('error.passwordMismatch');
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const success = await resetPassword({
      newPassword: formData.newPassword,
      confirmPassword: formData.confirmPassword,
      token: formData.token,
    });

    if (success) {
      toast.success(t('success.passwordChanged'));
      navigate('/login');
    } else {
      toast.error(t('error.passwordUpdateFailed'));
    }
  };

  if (!token) {
    return null; // Will be redirected by useEffect
  }

  return (
    <div className="mx-auto mt-10 px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: t('breadcrumb.home'), path: '/' },
          { label: t('breadcrumb.login'), path: '/login' },
          {
            label: t('breadcrumb.forgotPassword'),
            path: '/request-password-reset',
          },
          { label: t('breadcrumb.resetPassword'), path: '/reset-password' },
        ]}
      />
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {t('auth.resetPassword')}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="token" value={formData.token} />
            <PasswordInput
              id="newPassword"
              name="newPassword"
              label={t('auth.newPassword')}
              value={formData.newPassword}
              onChange={handleChange}
              placeholder={t('placeholder.newPassword')}
              className={errors.newPassword ? 'border-red-300' : ''}
              required
            />
            {errors.newPassword && (
              <p className="-mt-4 mb-4 text-sm text-red-600">
                {errors.newPassword}
              </p>
            )}

            <PasswordInput
              id="confirmPassword"
              name="confirmPassword"
              label={t('auth.confirmPassword')}
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder={t('placeholder.confirmNewPassword')}
              className={errors.confirmPassword ? 'border-red-300' : ''}
              required
            />
            {errors.confirmPassword && (
              <p className="-mt-4 mb-4 text-sm text-red-600">
                {errors.confirmPassword}
              </p>
            )}

            <div>
              <GeneralButton
                type="submit"
                variant="primary"
                className="w-full rounded-[10px]"
                disabled={loading}
              >
                {loading ? t('loading') : t('auth.resetPassword')}
              </GeneralButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
