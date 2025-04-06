import React, { useState } from 'react';
import InputField from '../../../shared/form/InputField';
import PasswordInput from '../../../shared/form/PasswordInput';
import SocialLoginButton from './SocialLoginButton';
import Divider from '../../../shared/Divider';
import Button from '../../../shared/Button'; // Import the reusable Button component
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State for loading

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state
    console.log('Login attempt with:', { email, password });

    // Simulate an API call
    setTimeout(() => {
      setIsLoading(false); // Reset loading state
    }, 2000);
  };

  return (
    <>
      <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">Login to your account</h1>

      <form onSubmit={handleSubmit}>
        <InputField
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="balamia@gmail.com"
          required
        />

        <PasswordInput
          id="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          forgotPasswordLink="#"
          required
        />

        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={isLoading} // Show loading spinner when submitting
          className="w-full rounded-[10px]"
        >
          Login now
        </Button>
      </form>

      <div className="mt-4 text-center text-sm text-gray-500">
        Don't Have An Account?
        <Link to="/register" className="ml-1 font-medium text-blue-600 hover:text-blue-500">
          Sign Up
        </Link>
      </div>

      <Divider text="Or" className="my-6" />

      <div className="mt-6 grid grid-cols-2 gap-3">
        <SocialLoginButton
          icon={<FcGoogle className="mr-2 h-5 w-5" />}
          text="Google"
          onClick={() => console.log('Google login')}
        />
        <SocialLoginButton
          icon={<FaFacebook className="mr-2 h-5 w-5 text-blue-600" />}
          text="Facebook"
          onClick={() => console.log('Facebook login')}
        />
      </div>
    </>
  );
};

export default LoginForm;