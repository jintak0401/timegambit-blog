import { RowDataPacket } from 'mysql2';
import { GetStaticProps } from 'next';

import { db } from '@/lib/db';

import phrases from '@/data/phrases';
import siteMetadata from '@/data/siteMetadata';

import Guestbook from '@/components/Guestbook';
import { PageSEO } from '@/components/SEO';

import queries from '@/pages/api/queries';

export const getStaticProps: GetStaticProps = async () => {
  let connection = null;
  try {
    connection = await db.getConnection();
    const [result] = await connection.query<RowDataPacket[]>(
      queries.READ_ALL_GUESTBOOK
    );
  } catch (e) {
    console.error(e);
  } finally {
    connection && connection.release();
  }

  return {
    props: {},
  };
};

export default function GuestbookPage() {
  const { title, description } = phrases.Guestbook;
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
            <Guestbook />
          </div>
        </div>
      </>
    </>
  );
}
