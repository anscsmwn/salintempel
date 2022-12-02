import React from 'react';
import { Helmet } from 'react-helmet-async';

interface LayoutProps {
  title: string;
  children: React.ReactNode;
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Helmet>
        <title>{title} | 🧾 SalinTempel</title>
      </Helmet>
      <div className="mx-auto max-w-md bg-white min-h-screen px-5">
        {children}
      </div>
    </>
  );
};

export default Layout;
