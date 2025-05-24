import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useUser } from '../../hooks/user';
import { RootState } from '../../context/store';
import { Lock } from 'lucide-react';
import { t } from '../../helpers/i18n';
import { showError, showSuccess } from '../../utils/messageRender';
import PasswordInput from '../../components/shared/form/PasswordInput';
import { GeneralButton } from '../../components/shared/Button';
import { ChangePasswordRequest } from '../../interfaces/user/ChangePasswordRequest';

const ChangePasswordPage: React.FC = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { changePassword, loading } = useUser();

  const [formData, setFormData] = useState<ChangePasswordRequest>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    let isValid = true;

    if (!formData.currentPassword.trim()) {
      showError(t('error.currentPasswordRequired'));
      isValid = false;
    }

    if (!formData.newPassword.trim()) {
      showError(t('error.newPasswordRequired'));
      isValid = false;
    } else if (formData.newPassword.length < 8) {
      showError(t('error.passwordLength'));
      isValid = false;
    }

    if (!formData.confirmPassword.trim()) {
      showError(t('error.confirmPasswordRequired'));
      isValid = false;
    } else if (formData.newPassword !== formData.confirmPassword) {
      showError(t('error.passwordMismatch'));
      isValid = false;
    }
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (!userInfo?.id) {
      return;
    }

    const result = await changePassword(userInfo.id, formData);

    if (result) {
      showSuccess(t('success.passwordChanged'));
      // Reset form
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    }
  };

  return (
    <div className="max-w-md w-full mx-auto my-5">
      <div className="mb-6 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
            <Lock className="h-6 w-6 text-blue-600" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {t('lbl.changePassword')}
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <PasswordInput
          id="currentPassword"
          name="currentPassword"
          label={t('lbl.currentPassword')}
          value={formData.currentPassword}
          onChange={handleChange}
          placeholder={t('placeholder.currentPassword')}
          required
        />

        <PasswordInput
          id="newPassword"
          name="newPassword"
          label={t('lbl.newPassword')}
          value={formData.newPassword}
          onChange={handleChange}
          placeholder={t('placeholder.newPassword')}
          required
        />

        <PasswordInput
          id="confirmPassword"
          name="confirmPassword"
          label={t('lbl.confirmPassword')}
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder={t('placeholder.confirmPassword')}
          required
        />

        <div className="mt-6">
          <GeneralButton
            type="submit"
            variant="primary"
            size="md"
            isLoading={loading}
            className="w-full rounded-[10px]"
          >
            {t('btn.changePassword')}
          </GeneralButton>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordPage;
