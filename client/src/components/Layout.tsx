import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import NavigationMenu from './NavigationMenu/NavigationMenu';

interface LayoutProps {
  title: string;
  children: React.ReactNode;
}

const Layout = ({ title, children }: LayoutProps) => {
  const location = useLocation();
  return (
    <>
      <Helmet>
        <title>{title} | SalinTempel</title>
      </Helmet>
      <div className="px-5">{children}</div>
      {/* {location.pathname !== '/login' && location.pathname !== '/register' && (
        <NavigationMenu />
      )} */}
    </>
  );
};

export default Layout;
