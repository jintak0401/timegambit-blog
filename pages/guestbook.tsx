import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useSession } from 'next-auth/react';

import { db } from '@/lib/db';
import { GuestbookEntryType } from '@/lib/types';

import phrases from '@/data/phrases';
import siteMetadata from '@/data/siteMetadata';

import GuestbookEntries from '@/components/Guestbook/GuestbookEntries';
import GuestbookInput from '@/components/Guestbook/GuestbookInput';
import GuestbookSignIn from '@/components/Guestbook/GuestbookSignIn';
import { PageSEO } from '@/components/SEO';

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
  const { title, description } = phrases.Guestbook;
  const { data: session } = useSession();
  return (
    <>
      <PageSEO
        title={`Guestbook - ${siteMetadata.author}`}
        description="블로그 방명록"
      />
      <>
        <div className="divide-y">
          <div className="space-y-2 pt-6 pb-8 md:space-y-5">
            <h1 className="basic-text text-3xl font-extrabold leading-9 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
              {title}
            </h1>
            {description && <p className="text-gray-500">{description}</p>}
            {session ? (
              <GuestbookInput session={session} />
            ) : (
              <GuestbookSignIn />
            )}
            <GuestbookEntries fallbackData={fallbackData} />
          </div>
        </div>
      </>
    </>
  );
}
