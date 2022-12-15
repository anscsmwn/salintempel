import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { UserAuth } from '../context/authContext';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { createUser } = UserAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    try {
      await createUser(email, password);
      navigate('/');
    } catch (error) {}
  };

  return (
    <Layout title="Register">
      <div className="flex items-center flex-col gap-5 justify-center pt-5">
        <h1 className="text-4xl font-bold text-center">
          Sign up for a free account
        </h1>
        <p className="py-2">
          Already have an account yet?{' '}
          <Link to="/login" className="underline">
            Sign in.
          </Link>
        </p>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex flex-col py-2">
            <label className="mb-2block text-sm font-medium text-slate-700">
              Email Address
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="border border-black rounded-md px-3 py-2 w-full"
              type="email"
            />
          </div>
          <div className="flex flex-col py-2">
            <label className="mb-2block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="border border-black rounded-md px-3 py-2 w-full"
              type="password"
            />
          </div>
          <button className="w-full mt-10 mx-auto font-bold py-3 px-4 rounded border border-black shadow-sm hover:bg-black hover:text-white transition-all duration-300">
            Sign Up
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
