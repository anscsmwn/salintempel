import Header from '../components/Header';
import ItemSalinTempel from '../components/ItemSalinTempel';
import Layout from '../components/Layout';
import { useGetMySalinTempels } from '../query-hooks/useSalinTempel';

const MySalinTempel = () => {
  const { data, isLoading } = useGetMySalinTempels();
  return (
    <Layout title="MySalinTempel">
      <Header />
      {data?.data.length === 0 && (
        <section>
          <>
            <img
              height={200}
              width={200}
              className="mx-auto mt-10"
              src="/confused-stickman.svg"
              alt="empty-state"
            />
            <p className="text-sm text-zinc-100 text-center mt-2">
              No data in MySalinTempel
            </p>
          </>
        </section>
      )}
      <section className="space-y-5 pt-10 pb-24">
        {data?.data.map((item) => (
          <ItemSalinTempel key={item._id} {...item} />
        ))}
      </section>
    </Layout>
  );
};

export default MySalinTempel;
