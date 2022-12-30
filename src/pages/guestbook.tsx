import phrases from 'data/phrases';
import siteMetadata from 'data/siteMetadata.mjs';
import { GetStaticProps, InferGetStaticPropsType } from 'next';

import { db } from '@/lib/db';
import { GuestbookEntryType } from '@/lib/types';

import { PageSEO } from '@/components/common/SEO';
import Guestbook from '@/components/Guestbook/Guestbook';
import GuestbookEntries from '@/components/Guestbook/GuestbookEntries';

import queries from '@/pages/api/queries';

export const getStaticProps: GetStaticProps = async () => {
  let connection = null;
  let fallbackData: GuestbookEntryType[] = [];
  try {
    connection = await db.getConnection();
    [fallbackData] = await connection.query<GuestbookEntryType[]>(
      queries.READ_ALL_GUESTBOOK
    );
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  } finally {
    connection && connection.release();
  }

  return {
    props: { fallbackData },
  };
};

export default function GuestbookPage({
  fallbackData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO
        title={`Guestbook - ${siteMetadata.author}`}
        description={phrases.Seo.guestbookDesc || siteMetadata.description}
      />
      <>
        <div className="divide-y">
          <div className="space-y-2 pt-6 pb-8 md:space-y-5">
            <h1 className="strong-text text-3xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
              {phrases.Guestbook.title}
            </h1>
            <p className="middle-text text-lg leading-7">
              {phrases.Guestbook.description}
            </p>
          </div>
          <div className="py-12">
            <Guestbook />
            <GuestbookEntries fallbackData={fallbackData} />
          </div>
        </div>
      </>
    </>
  );
}
