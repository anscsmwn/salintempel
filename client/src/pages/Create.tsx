import Layout from '../components/Layout';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
const Create = () => {
  const navigate = useNavigate();
  return (
    <Layout title="Create">
      <div className="pt-5 flex items-center gap-6">
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          <IoMdArrowRoundBack />
        </button>
        <h1 className="text-2xl font-bold">SalinTempel</h1>
      </div>
    </Layout>
  );
};

export default Create;
