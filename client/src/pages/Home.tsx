import Layout from '../components/Layout';

import {
  useGetSalinTempels,
  useGetSalinTempelSort,
} from '../query-hooks/useSalinTempel';
import ItemSalinTempel from '../components/ItemSalinTempel';
import InfiniteScroll from 'react-infinite-scroll-component';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import Header from '../components/Header';
import React from 'react';

import { AiOutlineClockCircle, AiOutlineFire } from 'react-icons/ai';

const Home = () => {
  const sort = useGetSalinTempelSort();
  const [isSortNew, setIsSortNew] = React.useState<boolean>(true);
  const [isSortPopular, setIsSortPopular] = React.useState<boolean>(false);
  const { data, isLoading, fetchNextPage, hasNextPage } = useGetSalinTempels(
    isSortNew,
    isSortPopular,
  );

  if (isLoading)
    return (
      <AiOutlineLoading3Quarters className="animate-spin text-4xl mx-auto text-slate-800 text-center pt-10" />
    );

  return (
    <Layout title="Home">
      <Header />
      {data?.pages[0].count === 0 ? (
        <section>
          <>
            <img
              height={200}
              width={200}
              className="mx-auto mt-10"
              src="/confused-stickman.svg"
              alt="empty-state"
            />
            <p className="text-sm text-zinc-100 text-center mt-2">No data</p>
          </>
        </section>
      ) : (
        <>
          <div className="flex items-center gap-4 text-xs mt-4">
            <button
              onClick={() => {
                setIsSortNew((prev) => !prev);
                sort.mutate({ isSortNew: !isSortNew, isSortPopular });
              }}
              className={`flex gap-1 items-center px-3 py-2 rounded-full border border-white  ${
                isSortNew ? 'bg-white text-[#22232a]' : ''
              }`}
            >
              <AiOutlineClockCircle />
              <p>New</p>
            </button>
            <button
              onClick={() => {
                setIsSortPopular((prev) => !prev);
                sort.mutate({ isSortPopular: !isSortPopular, isSortNew });
              }}
              className={`flex gap-1 items-center px-3 py-2 rounded-full border border-white ${
                isSortPopular ? 'bg-white text-[#22232a]' : ''
              }`}
            >
              <AiOutlineFire />
              <p>Popular</p>
            </button>
          </div>
          <section className="mt-5 space-y-5">
            {data && (
              <InfiniteScroll
                dataLength={data.pages.length}
                next={() => {
                  fetchNextPage();
                }}
                // @ts-ignore
                hasMore={hasNextPage}
                loader={
                  <p className="text-center text-white text-sx py-4">
                    Loading...
                  </p>
                }
                endMessage={
                  <p className="py-5" style={{ textAlign: 'center' }}>
                    <b>Yay! You have seen it all</b>
                  </p>
                }
              >
                <div className="space-y-5">
                  {data?.pages.map((page, idx) => (
                    <React.Fragment key={idx}>
                      {page.data.map((item) => (
                        <ItemSalinTempel key={item._id} {...item} />
                      ))}
                    </React.Fragment>
                  ))}
                </div>
              </InfiniteScroll>
            )}
          </section>
        </>
      )}
    </Layout>
  );
};

export default Home;
