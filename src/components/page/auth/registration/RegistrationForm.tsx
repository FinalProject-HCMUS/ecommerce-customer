import React, { useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import InputField from '../../../shared/form/InputField';
import PasswordInput from '../../../shared/form/PasswordInput';
import { GeneralButton } from '../../../shared/Button'; // Import the reusable Button component

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

type Action = { type: 'SET_FIELD'; field: keyof FormState; value: string } | { type: 'RESET_FORM' };

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

  const handleInputChange =
    (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      dispatch({ type: 'SET_FIELD', field, value: e.target.value });
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state
    console.log('Form Submitted:', formState);

    // Simulate an API call
    setTimeout(() => {
      setIsLoading(false); // Reset loading state
      dispatch({ type: 'RESET_FORM' }); // Reset the form after submission
    }, 2000);
  };

  return (
    <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
      <div className="max-w-md mx-auto w-full">
        <h2 className="text-3xl font-bold mb-6">Create an account</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <InputField
            id="firstName"
            label="First name"
            type="text"
            value={formState.firstName}
            onChange={handleInputChange('firstName')}
            placeholder="le"
            required
          />
            <InputField
            id="lastName"
            label="Last name"
            type="text"
            value={formState.lastName}
            onChange={handleInputChange('lastName')}
            placeholder="hoang"
            required
          />
          <InputField
            id="email"
            label="Email"
            type="email"
            value={formState.email}
            onChange={handleInputChange('email')}
            placeholder="balamla@gmail.com"
            required
          />

          <InputField
            id="phone"
            label="Phone"
            type="tel"
            value={formState.phone}
            onChange={handleInputChange('phone')}
            placeholder="09876543223"
            required
          />

          <PasswordInput
            id="password"
            label="Password"
            value={formState.password}
            onChange={handleInputChange('password')}
            placeholder="Enter your password"
            required
          />

          <PasswordInput
            id="confirmPassword"
            label="Confirm Password"
            value={formState.confirmPassword}
            onChange={handleInputChange('confirmPassword')}
            placeholder="Confirm your password"
            required
          />

          <GeneralButton
            type="submit"
            variant="primary"
            size="md"
            isLoading={isLoading} // Show loading spinner when submitting
            className="w-full rounded-[10px]"
          >
            Create account
          </GeneralButton>
        </form>

        <p className="mt-6 text-center">
          Already Have An Account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationForm;
