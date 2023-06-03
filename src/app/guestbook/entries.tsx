'use client';

import { DefaultSession } from 'next-auth';
import useSWR from 'swr';

import { GuestbookEntryType } from '@/types';

import GuestbookEntry from './entry';

interface Props {
  user: DefaultSession['user'];
  fallbackData: GuestbookEntryType[];
}

const DEDUPING_INTERVAL = 60000;
const getGuestbooks = async (): Promise<GuestbookEntryType[]> => {
  const res = await fetch('/api/guestbook');
  if (!res.ok) {
    throw new Error(
      'An error occurred while fetching the data. [GuestbookEntries]'
    );
  }
  return res.json();
};

const GuestbookEntries = ({ user, fallbackData }: Props) => {
  const { data: entries } = useSWR('/api/guestbook', getGuestbooks, {
    dedupingInterval: DEDUPING_INTERVAL,
    fallbackData,
  });

  return (
    <div>
      {entries.map((entry: GuestbookEntryType) => (
        <GuestbookEntry key={entry.id} entry={entry} user={user} />
      ))}
    </div>
  );
};

export default GuestbookEntries;
