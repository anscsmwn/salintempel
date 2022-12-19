import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const NotFound = () => {
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
        <p className="text-zinc-100 text-center mt-2 font-semibold text-3xl">
          Not Found
        </p>
        <Link
          to="/"
          className="text-sm text-zinc-100 text-center mt-2 underline underline-offset-2"
        >
          Back to Home
        </Link>
      </section>
    </Layout>
  );
};

export default NotFound;
