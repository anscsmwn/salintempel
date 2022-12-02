import Layout from '../components/Layout';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { useCreateSalinTempel } from '../query-hooks/useSalinTempel';
const Create = () => {
  const navigate = useNavigate();
  const add = useCreateSalinTempel();
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: {
      title: string;
      content: string;
      author?: string;
    } = {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      author: formData.get('author') as string,
    };
    if (data.author === '') {
      delete data.author;
    }
    add.mutate(data, {
      onSuccess: () => {
        navigate('/');
      },
    });
  };
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
      <section className="mt-10 mx-5">
        <form onSubmit={onSubmit}>
          <div className="mb-5">
            <label htmlFor="author" className="block mb-2">
              Author (Optional)
            </label>
            <input
              type="text"
              name="author"
              id="author"
              className="border border-black rounded-md px-3 py-2 w-full"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="title" className="block mb-2">
              Title
            </label>
            <input
              required
              type="text"
              name="title"
              id="title"
              className="border border-black rounded-md px-3 py-2 w-full"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="content" className="block mb-2">
              Content
            </label>
            <textarea
              required
              name="content"
              id="content"
              className="border border-black rounded-md px-3 py-2 w-full"
            />
          </div>
          <button className="bg-black text-white px-5 py-2 rounded-md">
            Create
          </button>
        </form>
      </section>
    </Layout>
  );
};

export default Create;
