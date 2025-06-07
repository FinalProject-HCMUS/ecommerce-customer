import LoginForm from '../../components/page/auth/login/LoginForm';

function LoginPage() {
  return (
    <div className="flex items-center justify-center bg-white my-12 p-4">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
