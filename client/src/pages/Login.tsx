import { FcGoogle } from 'react-icons/fc';
import { UserAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Login = () => {
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

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
    <div className="flex items-center flex-col gap-5 justify-center mt-5">
      <h1 className="text-4xl font-bold text-center">Login</h1>
      <button
        className="font-bold py-2 px-4 rounded mx-auto w-full max-w-xs border border-black shadow-sm flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300"
        onClick={() => handleGoogleSignIn()}
      >
        <FcGoogle className="inline-block mr-2" />
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
