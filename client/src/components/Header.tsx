import { AiOutlinePlus } from 'react-icons/ai';
import { HiLogout, HiLogin } from 'react-icons/hi';
import { MdWavingHand } from 'react-icons/md';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/authContext';
import { IoMdArrowRoundBack } from 'react-icons/io';

const Header = () => {
  const { logOut, user } = UserAuth();
  const formattedName = (name: string) => {
    const displayName = name.split('@')[0];
    return displayName.charAt(0).toUpperCase() + displayName.slice(1);
  };
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <header>
      <div className="pt-5 flex items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <button
            onClick={() => {
              if (
                location.pathname === '/create' ||
                location.pathname.split('/')[1] === 'edit'
              ) {
                navigate('/');
              } else {
                navigate('/create');
              }
            }}
            className="btn-primary border-none"
          >
            {location.pathname === '/create' ||
            location.pathname.split('/')[1] === 'edit' ? (
              <IoMdArrowRoundBack />
            ) : (
              <AiOutlinePlus />
            )}
          </button>
          <h1 className="text-2xl font-bold">SalinTempel</h1>
        </div>
        {user ? (
          <button
            className="btn-primary"
            onClick={() => {
              logOut();
            }}
          >
            <HiLogout className="hidden sm:block" />
            <p className="text-sm font-semibold">Logout</p>
          </button>
        ) : (
          <Link className="btn-primary" to="/login">
            <HiLogin className="hidden sm:block" />
            <p className="text-sm font-semibold">Login</p>
          </Link>
        )}
      </div>
      <div className="flex gap-2 items-center mt-5 justify-end">
        <p className="text-sm">
          Hi,{' '}
          {user
            ? user.displayName
              ? `${formattedName(user.displayName)}`
              : `${formattedName(user.email!)}`
            : 'Guest'}
        </p>
        <MdWavingHand />
      </div>
    </header>
  );
};

export default Header;
