import Layout from '../components/Layout';
import { AiOutlinePlus } from 'react-icons/ai';
import { useGetSalinTempels } from '../query-hooks/useSalinTempel';
import { HiLogout, HiLogin } from 'react-icons/hi';
import { MdWavingHand } from 'react-icons/md';
import { Link } from 'react-router-dom';
import ItemSalinTempel from '../components/ItemSalinTempel';
import { UserAuth } from '../context/authContext';

const Home = () => {
  const { data, isLoading } = useGetSalinTempels();
  const { logOut, user } = UserAuth();
  if (isLoading)
    return <p className="text-sm text-gray-300 text-center">Loading...</p>;
  return (
    <Layout title="Home">
      <div>
        <div className="pt-5 flex items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <Link
              to="/create"
              className="hover:bg-zinc-100 p-3 rounded-md duration-300 transition-all"
            >
              <AiOutlinePlus />
            </Link>
            <h1 className="text-2xl font-bold">SalinTempel</h1>
          </div>
          {user ? (
            <button
              className="hover:bg-zinc-100 p-3 rounded-md duration-300 transition-all"
              onClick={() => {
                logOut();
              }}
            >
              <HiLogout />
            </button>
          ) : (
            <Link
              className="hover:bg-zinc-100 p-3 rounded-md duration-300 transition-all"
              to="/login"
            >
              <HiLogin />
            </Link>
          )}
        </div>
      </div>
      <div className="flex gap-2 items-center mt-2">
        <MdWavingHand />
        <p className="text-sm">Hi, {user ? `${user.displayName}` : 'Guest'}</p>
      </div>
      <section>
        {data?.data.length === 0 && (
          <>
            <img
              height={200}
              width={200}
              className="mx-auto mt-10"
              src="/confused-stickman.svg"
              alt="empty-state"
            />
            <p className="text-sm text-gray-600 text-center mt-2">No data</p>
          </>
        )}
      </section>
      <section className="mt-10">
        {data?.data.map((salinTempel) => (
          <ItemSalinTempel key={salinTempel._id} {...salinTempel} />
        ))}
      </section>
    </Layout>
  );
};

export default Home;
