import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { UserAuth } from '../context/authContext';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from '../components/Layout';
import AlertError from '../components/AlertError';

const Login = () => {
  const { googleSignIn, user, signIn } = UserAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors([]);
    try {
      await signIn(email, password);
      navigate('/');
    } catch (error: any) {
      setErrors([error.message.split(':')[1]]);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate('/');
    }
  }, [user]);

  return (
    <Layout title="Login">
      <div className="flex items-center flex-col gap-5 justify-center pt-5">
        <h1 className="text-4xl font-bold text-center">
          Sign in to your account
        </h1>
        <p className="py-2">
          Don't have an account yet?{' '}
          <Link to="/register" className="underline">
            Register here.
          </Link>
        </p>
        <AlertError errors={errors} />
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex flex-col py-2">
            <label className="label">Email Address</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              type="email"
              required
            />
          </div>
          <div className="flex flex-col py-2">
            <label className="label">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              type="password"
              required
            />
          </div>
          <button className="btn-secondary">Sign In</button>
        </form>

        <div className="flex items-center justify-between w-full">
          <div className="w-full border-b border-zinc-100"></div>
          <p className="py-2 w-full text-zinc-100 text-center text-xs sm:text-sm px-5">
            Or continue with
          </p>
          <div className="w-full border-b border-zinc-100"></div>
        </div>

        <button onClick={() => handleGoogleSignIn()}>
          <FcGoogle className="inline-block text-3xl" />
        </button>
      </div>
    </Layout>
  );
};

export default Login;
