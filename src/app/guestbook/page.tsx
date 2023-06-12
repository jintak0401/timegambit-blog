import { Metadata } from 'next';

import phrases from 'data/phrases';
import siteMetadata from 'data/site-metadata.mjs';

import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/auth';
import { generateDefaultMetadata } from '@/lib/metadata';

import GuestbookEntries from './entries';
import Guestbook from './guestbook';

export const metadata: Metadata = generateDefaultMetadata({
  title: 'Guestbook',
  description: phrases.Seo.guestbookDesc || siteMetadata.description,
  url: `${siteMetadata.siteUrl}/guestbook`,
});

const getGuestbooks = async () => {
  const res = await fetch(`${process.env.API_URL}/api/guestbook`, {
    method: 'GET',
    next: {
      revalidate: siteMetadata.revalidate,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch guestbooks');
  }

  return res.json();
};

const GuestbookPage = async () => {
  const guestbooks = await getGuestbooks();
  const session = await getServerSession(authOptions);
  return (
    <div className="divide-y">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="strong-text text-3xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          {phrases.Guestbook.title}
        </h1>
        <div className="middle-text text-lg leading-7">
          {phrases.Guestbook.description}
        </div>
      </div>
      <div className="py-12">
        <Guestbook user={session?.user} />
        <GuestbookEntries fallbackData={guestbooks} user={session?.user} />
      </div>
    </div>
  );
};

export default GuestbookPage;
