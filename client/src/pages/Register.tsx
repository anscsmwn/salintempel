import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AlertError from '../components/AlertError';
import Layout from '../components/Layout';
import { UserAuth } from '../context/authContext';
const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();
  const { createUser } = UserAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors([]);
    try {
      await createUser(email, password);
      navigate('/');
    } catch (error: any) {
      setErrors([error.message.split(':')[1]]);
    }
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
        <AlertError errors={errors} />
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex flex-col py-2">
            <label className="mb-2 label">Email Address</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              type="email"
              required
            />
          </div>
          <div className="flex flex-col py-2">
            <label className="mb-2 label">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              type="password"
              required
            />
          </div>
          <button className="btn-secondary">Sign Up</button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
