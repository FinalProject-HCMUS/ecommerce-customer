import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../../hooks/user';
import { t } from '../../helpers/i18n';
import { CheckCircle, XCircle } from 'lucide-react';

enum ConfirmStatus {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

const ConfirmEmailPage: React.FC = () => {
  const [confirmationState, setConfirmationState] = useState<ConfirmStatus>(
    ConfirmStatus.LOADING
  );
  const { confirmUserEmail, loading } = useUser();
  const location = useLocation();

  useEffect(() => {
    const confirmEmail = async () => {
      const queryParams = new URLSearchParams(location.search);
      const token = queryParams.get('token');

      if (!token) {
        setConfirmationState(ConfirmStatus.ERROR);
        return;
      }

      const result = await confirmUserEmail(token);
      if (result) {
        setConfirmationState(ConfirmStatus.SUCCESS);
      } else {
        setConfirmationState(ConfirmStatus.ERROR);
      }
    };

    confirmEmail();
  }, [location.search]);

  return (
    <div className="max-w-md w-full mx-auto p-6">
      {(loading || confirmationState === ConfirmStatus.LOADING) && (
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <h2 className="mt-4 text-xl font-semibold text-gray-900">
            {t('lbl.verifyingEmail')}
          </h2>
          <p className="mt-2 text-gray-600">{t('lbl.pleaseWait')}</p>
        </div>
      )}

      {confirmationState === 'success' && (
        <div className="text-center">
          <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
          <h2 className="mt-4 text-xl font-semibold text-gray-900">
            {t('lbl.emailConfirmed')}
          </h2>
          <div className="mt-6">
            <Link to="/login" className="w-full">
              {t('lbl.proceedToLogin')}
            </Link>
          </div>
        </div>
      )}

      {confirmationState === ConfirmStatus.ERROR && (
        <div className="text-center">
          <XCircle className="mx-auto h-12 w-12 text-red-500" />
          <h2 className="mt-4 text-xl font-semibold text-gray-900">
            {t('lbl.emailConfirmationFailed')}
          </h2>
          <p className="mt-2 text-gray-600">
            {t('lbl.emailConfirmationFailedDescription')}
          </p>
          <div className="mt-6 space-y-3">
            <Link to="/login" className="w-full">
              {t('lbl.requestNewConfirmation')}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmEmailPage;
