import Layout from '../components/Layout';
import { useGetSalinTempels } from '../query-hooks/useSalinTempel';
import ItemSalinTempel from '../components/ItemSalinTempel';
import InfiniteScroll from 'react-infinite-scroll-component';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import Header from '../components/Header';
import React from 'react';
const Home = () => {
  const { data, isLoading, fetchNextPage, hasNextPage } = useGetSalinTempels();

  if (isLoading)
    return (
      <AiOutlineLoading3Quarters className="animate-spin text-4xl mx-auto text-slate-700 text-center pt-10" />
    );

  return (
    <Layout title="Home">
      <Header />

      {data?.pages[0].count === 0 && (
        <section>
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
        </section>
      )}

      <section className="mt-10 space-y-5">
        {data && (
          <InfiniteScroll
            dataLength={data.pages.length}
            next={() => {
              fetchNextPage();
            }}
            // @ts-ignore
            hasMore={hasNextPage}
            loader={<p className="text-center text-black">Loading...</p>}
            endMessage={
              <p className="py-5" style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {data?.pages.map((page, idx) => (
              <React.Fragment key={idx}>
                {page.data.map((item) => (
                  <ItemSalinTempel key={item._id} {...item} />
                ))}
              </React.Fragment>
            ))}
          </InfiniteScroll>
        )}
      </section>
    </Layout>
  );
};

export default Home;
