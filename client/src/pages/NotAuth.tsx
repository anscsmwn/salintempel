import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const NotAuth = () => {
  return (
    <Layout title="404 Not Found">
      <section className="flex pt-20 justify-center items-center flex-col">
        <img
          height={200}
          width={200}
          className="mx-auto"
          src="/confused-stickman.svg"
          alt="empty-state"
        />
        <p className="text-zinc-100 text-center mt-2 font-semibold text-2xl max-w-sm">
          You have to login first before you can access this page
        </p>
        <Link
          to="/login"
          className="text-sm text-zinc-100 text-center mt-2 underline underline-offset-2"
        >
          Go to Login
        </Link>
      </section>
    </Layout>
  );
};

export default NotAuth;
