import { useSession } from 'next-auth/react';
import useSWR from 'swr';

import fetcher from '@/lib/fetcher';
import { GuestbookEntryType } from '@/lib/types';

import GuestbookEntry from '@/components/Guestbook/GuestbookEntry';

interface Props {
  fallbackData: GuestbookEntryType[];
}

const GuestbookEntries = ({ fallbackData }: Props) => {
  const { data: session } = useSession();
  const { data: entries } = useSWR('/api/guestbook', fetcher, { fallbackData });

  return (
    <div>
      {(entries as GuestbookEntryType[]).map((entry: GuestbookEntryType) => (
        <GuestbookEntry key={entry.id} entry={entry} session={session} />
      ))}
    </div>
  );
};

export default GuestbookEntries;
