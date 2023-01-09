import { useSession } from 'next-auth/react';
import useSWR from 'swr';

import { GuestbookEntryType } from '@/lib/types';

import GuestbookEntry from './GuestbookEntry';

interface Props {
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

const GuestbookEntries = ({ fallbackData }: Props) => {
  const { data: session } = useSession();
  const { data: entries } = useSWR('/api/guestbook', getGuestbooks, {
    dedupingInterval: DEDUPING_INTERVAL,
    fallbackData,
  });

  return (
    <div>
      {(entries as GuestbookEntryType[]).map((entry: GuestbookEntryType) => (
        <GuestbookEntry key={entry.id} entry={entry} session={session} />
      ))}
    </div>
  );
};

export default GuestbookEntries;
