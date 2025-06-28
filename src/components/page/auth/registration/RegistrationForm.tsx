import React, { useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import InputField from '../../../shared/form/InputField';
import PasswordInput from '../../../shared/form/PasswordInput';
import { GeneralButton } from '../../../shared/Button'; // Import the reusable Button component
import { useUser } from '../../../../hooks/user';
import { Role } from '../../../../interfaces';
import { messageRenderUtils } from '../../../../utils';
import { t } from '../../../../helpers/i18n';

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

type Action =
  | { type: 'SET_FIELD'; field: keyof FormState; value: string }
  | { type: 'RESET_FORM' };

const initialState: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
};

const formReducer = (state: FormState, action: Action): FormState => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'RESET_FORM':
      return initialState;
    default:
      return state;
  }
};

const RegistrationForm = () => {
  const [formState, dispatch] = useReducer(formReducer, initialState);
  const [isLoading, setIsLoading] = useState(false); // State for loading
  const { createUser } = useUser();

  const handleInputChange =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      dispatch({ type: 'SET_FIELD', field, value: e.target.value });
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state

    // Validate password and confirm password
    if (formState.password !== formState.confirmPassword) {
      messageRenderUtils.showError(t('error.passwordMismatch'));
      setIsLoading(false);
      return;
    }

    // Prepare the data for the API call
    const userData = {
      firstName: formState.firstName,
      lastName: formState.lastName,
      email: formState.email,
      phoneNumber: formState.phone,
      password: formState.password,
      role: 'USER' as Role,
    };

    try {
      const response = await createUser(userData);
      if (response) {
        messageRenderUtils.showSuccess(t('success.registerSuccess'));
        dispatch({ type: 'RESET_FORM' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full md:w-7/12 mt-8 flex justify-center px-16">
      <div className="mx-auto w-full">
        <h2 className="text-3xl font-bold mb-6">{t('lbl.register')}</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <InputField
            id="firstName"
            label={t('lbl.firstName')}
            type="text"
            value={formState.firstName}
            onChange={handleInputChange('firstName')}
            placeholder={t('placeholder.firstName')}
            required
          />
          <InputField
            id="lastName"
            label={t('lbl.lastName')}
            type="text"
            value={formState.lastName}
            onChange={handleInputChange('lastName')}
            placeholder={t('placeholder.lastName')}
            required
          />
          <InputField
            id="email"
            label={t('lbl.email')}
            type="email"
            value={formState.email}
            onChange={handleInputChange('email')}
            placeholder={t('placeholder.email')}
            required
          />

          <InputField
            id="phone"
            label={t('lbl.phone')}
            type="tel"
            value={formState.phone}
            onChange={handleInputChange('phone')}
            placeholder={t('placeholder.phone')}
            required
          />

          <PasswordInput
            id="password"
            label={t('lbl.password')}
            value={formState.password}
            onChange={handleInputChange('password')}
            placeholder={t('placeholder.password')}
            required
          />

          <PasswordInput
            id="confirmPassword"
            label={t('lbl.confirmPassword')}
            value={formState.confirmPassword}
            onChange={handleInputChange('confirmPassword')}
            placeholder={t('placeholder.confirmPassword')}
            required
          />

          <GeneralButton
            type="submit"
            variant="primary"
            size="md"
            isLoading={isLoading} // Show loading spinner when submitting
            className="w-full rounded-[10px]"
          >
            {t('btn.createAccount')}
          </GeneralButton>
        </form>

        <p className="mt-6 text-center">
          {t('lbl.notRegistered')}{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            {t('hyperlink.login')}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationForm;
