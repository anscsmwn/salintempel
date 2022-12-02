import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';
import { useGetSalinTempels } from '../query-hooks/useSalinTempel';
import ItemSalinTempel from '../components/ItemSalinTempel';
const Home = () => {
  const { data, isLoading } = useGetSalinTempels();
  return (
    <Layout title="Home">
      <div className="pt-5 flex items-center gap-6">
        <Link to="/create">
          <AiOutlinePlus />
        </Link>
        <h1 className="text-2xl font-bold">SalinTempel</h1>
      </div>
      <section className="mt-10">
        {data?.data.map((salinTempel) => (
          <ItemSalinTempel key={salinTempel._id} {...salinTempel} />
        ))}
      </section>
    </Layout>
  );
};

export default Home;
