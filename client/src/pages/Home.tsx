import Layout from '../components/Layout';
import { useGetSalinTempels } from '../query-hooks/useSalinTempel';
import ItemSalinTempel from '../components/ItemSalinTempel';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import Header from '../components/Header';
const Home = () => {
  const { data, isLoading } = useGetSalinTempels();
  if (isLoading)
    return (
      <AiOutlineLoading3Quarters className="animate-spin text-4xl mx-auto text-slate-700 text-center pt-10" />
    );

  return (
    <Layout title="Home">
      <Header />
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
      <section className="mt-10 space-y-5 pb-20">
        {data?.data.map((salinTempel) => (
          <ItemSalinTempel key={salinTempel._id} {...salinTempel} />
        ))}
      </section>
    </Layout>
  );
};

export default Home;
