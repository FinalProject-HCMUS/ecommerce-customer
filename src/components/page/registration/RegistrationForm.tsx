import FormInput from './FormInput';
import PasswordInput from './PasswordInput';
import Button from './Button';
import { Link } from 'react-router-dom';

const RegistrationForm = () => {
  return (
    <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
      <div className="max-w-md mx-auto w-full">
        <h2 className="text-3xl font-bold mb-6">Create an account</h2>

        <form className="space-y-4">
          <FormInput id="fullname" label="Fullname" type="text" placeholder="Le Minh Hoang" />

          <FormInput id="email" label="Email" type="email" placeholder="balamla@gmail.com" />

          <FormInput id="phone" label="Phone Number" type="tel" placeholder="09876543223" />

          <PasswordInput id="password" label="Password" placeholder="Enter your password" />

          <PasswordInput id="confirmPassword" label="Confirm Password" placeholder="Confirm your password" />

          <Button type="submit">Create account</Button>
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
