import ShopInfo from '../../components/page/auth/registration/ShopInfo';
import RegistrationForm from '../../components/page/auth/registration/RegistrationForm';

function Registration() {
  return (
    <div className="flex mt-20 my-8 mx-8 flex-col md:flex-row min-h-screen">
      {/* Left side - Shop info */}
      <ShopInfo />
      {/* Right side - Registration form */}
      <RegistrationForm />
    </div>
  );
}

export default Registration;
