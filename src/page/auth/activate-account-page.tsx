import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useUser } from '../../hooks/user';
import { Mail } from 'lucide-react';
import { t } from '../../helpers/i18n';
import { showError, showSuccess } from '../../utils/messageRender';
import InputField from '../../components/shared/form/InputField';
import { GeneralButton } from '../../components/shared/Button';

const ActivateAccountPage: React.FC = () => {
  const { resendUserConfirmationEmail, loading } = useUser();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [email, setEmail] = useState<string>('');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      showError(t('error.emailRequired'));
      return false;
    } else if (!emailRegex.test(email)) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateEmail(email)) return;

    const result = await resendUserConfirmationEmail(email);

    if (result) {
      showSuccess(t('success.sendEmailActivation'));
      setIsSubmitted(true);
    } else {
      showError(t('success.sendEmailActivationFailed'));
    }
  };
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <div className="max-w-md w-full mx-auto mb-8">
      <div className="mb-6 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
            <Mail className="h-6 w-6 text-blue-600" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {t('lbl.activateAccount')}
        </h1>
      </div>

      {isSubmitted ? (
        <div className="bg-green-50 border border-green-200 rounded-[12px] p-4 mb-6">
          <div className="mt-4 text-center">
            <h2 className="text-lg font-semibold text-green-800">
              {t('lbl.checkEmail')}
            </h2>
            <GeneralButton
              className="rounded-[12px]"
              onClick={() => setIsSubmitted(false)}
            >
              {t('btn.sendAnother')}
            </GeneralButton>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <InputField
              id="email"
              label={t('lbl.email')}
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={handleEmailChange}
              onBlur={() => validateEmail(email)}
              required
            />
          </div>

          <GeneralButton
            type="submit"
            disabled={loading || !email.trim()}
            className="w-full rounded-[12px]"
          >
            {t('btn.sendConfirmationEmail')}
          </GeneralButton>
        </form>
      )}
    </div>
  );
};

export default ActivateAccountPage;
