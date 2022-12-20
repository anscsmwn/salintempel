import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { UserAuth } from '../context/authContext';
import NotAuth from '../pages/NotAuth';

const RequireAuth = () => {
  const { user } = UserAuth();
  const isAuthorize = user?.email ? true : false;
  return isAuthorize ? <Outlet /> : <NotAuth />;
};

export default RequireAuth;
