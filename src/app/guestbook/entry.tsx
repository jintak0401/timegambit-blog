import NextImage from 'next/image';

import phrases from 'data/phrases';

import { DefaultSession } from 'next-auth';
import { toast } from 'react-toastify';
import { useSWRConfig } from 'swr';

import { GuestbookEntryType } from '@/types';

interface Props {
  entry: GuestbookEntryType;
  user: DefaultSession['user'];
}

const GuestbookEntry = ({ entry, user }: Props) => {
  const { mutate } = useSWRConfig();
  const deleteEntry = async () => {
    try {
      await fetch(`/api/guestbook/${entry.id}`, {
        method: 'DELETE',
      });

      mutate('/api/guestbook');

      toast(phrases.Guestbook.successDelete, { type: 'success' });
    } catch (e) {
      toast(phrases.Guestbook.errorDelete, { type: 'error' });
    }
  };

  return (
    <div className="my-4 flex w-full items-start gap-6 rounded-md border px-4 py-4 md:px-10">
      <NextImage
        src={entry.image}
        alt={`${entry.name}'s profile image`}
        className="h-10 w-10 rounded-full object-cover"
        loading="lazy"
        width="40"
        height="40"
      />
      <div className="w-5/6 flex-1">
        <div className="flex items-center justify-between">
          <div className="max-w-full">
            <span className="sr-only">Name</span>
            <div className="strong-text max-w-full truncate">{entry.name}</div>
            <span className="sr-only">Creation Date</span>
            <div className="weak-text">{entry.updatedAt}</div>
          </div>
          {user?.email === entry.email && (
            <button
              className="duration-default h-fit rounded-md border-2 border-primary-200 px-3 py-1 hover:bg-primary-200 dark:border-primary-700 dark:hover:bg-primary-700"
              onClick={deleteEntry}
            >
              {phrases.Guestbook.delete}
            </button>
          )}
        </div>
        <p className="strong-text my-2">{entry.body}</p>
      </div>
    </div>
  );
};

export default GuestbookEntry;
