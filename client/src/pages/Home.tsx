import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';
import { useGetSalinTempels } from '../query-hooks/useSalinTempel';
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
    </Layout>
  );
};

export default Home;
