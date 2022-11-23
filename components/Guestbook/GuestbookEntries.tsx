import { useSession } from 'next-auth/react';

import { GuestbookEntryType } from '@/lib/types';

import GuestbookEntry from '@/components/Guestbook/GuestbookEntry';

interface Props {
  fallbackData: GuestbookEntryType[];
}

const GuestbookEntries = ({ fallbackData }: Props) => {
  const { data: session } = useSession();

  return (
    <div>
      {fallbackData.map((entry) => (
        <GuestbookEntry key={entry.id} entry={entry} session={session} />
      ))}
    </div>
  );
};

export default GuestbookEntries;
