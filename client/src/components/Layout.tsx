import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
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
      <div className="px-5 bg-[#18181b] text-[#f7f7f6] min-h-screen">
        {children}
      </div>
    </>
  );
};

export default Layout;
