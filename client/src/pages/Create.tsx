import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import { useCreateSalinTempel } from '../query-hooks/useSalinTempel';
import { UserAuth } from '../context/authContext';
import Header from '../components/Header';
const Create = () => {
  const { user } = UserAuth();
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
      <Header />
      <section className="mt-10">
        <form onSubmit={onSubmit}>
          <div className="mb-5">
            <label htmlFor="author" className="mb-2 label">
              Author (Optional)
            </label>
            <input
              type="text"
              name="author"
              id="author"
              className="input"
              defaultValue={user ? user.email! : ''}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="title"
              className="mb-2 after:content-['*'] after:ml-0.5 after:text-red-500 label"
            >
              Title
            </label>
            <input
              required
              type="text"
              name="title"
              id="title"
              className="input"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="content"
              className="mb-2 after:content-['*'] after:ml-0.5 after:text-red-500 label"
            >
              Content
            </label>
            <textarea
              required
              name="content"
              id="content"
              rows={5}
              className="input"
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
