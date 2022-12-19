import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import Header from '../components/Header';
import ItemSalinTempel from '../components/ItemSalinTempel';
import Layout from '../components/Layout';
import { useGetMyFavorites } from '../query-hooks/useSalinTempel';

const Favorites = () => {
  const { data, isLoading } = useGetMyFavorites();
  if (isLoading)
    return (
      <AiOutlineLoading3Quarters className="animate-spin text-4xl mx-auto text-slate-800 text-center pt-10" />
    );
  return (
    <Layout title="Favorites">
      <Header />
      <section className="space-y-5 pt-10 pb-24">
        {data?.data.map((item) => (
          <ItemSalinTempel key={item._id} {...item} />
        ))}
      </section>
    </Layout>
  );
};

export default Favorites;
