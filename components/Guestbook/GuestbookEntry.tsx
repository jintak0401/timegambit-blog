import NextImage from 'next/image';
import { Session } from 'next-auth';
import { toast } from 'react-toastify';
import { mutate } from 'swr';

import { GuestbookEntryType } from '@/lib/types';

import phrases from '@/data/phrases';

interface Props {
  entry: GuestbookEntryType;
  session: Session | null;
}

const GuestbookEntry = ({ entry, session }: Props) => {
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
        alt="프로필 사진"
        className="rounded-full"
        loading="lazy"
        width="40"
        height="40"
        objectFit="cover"
      />
      <div className="w-5/6 flex-1">
        <div className="flex items-center justify-between">
          <div className="max-w-full">
            <div className="max-w-full truncate">{entry.name}</div>
            <div className="weak-text">{entry.updatedAt}</div>
          </div>
          {session?.user?.email === entry.email && (
            <button
              className="h-fit rounded-md border-2 border-primary-200 px-3 py-1 duration-300 hover:bg-primary-200 dark:border-primary-700 dark:hover:bg-primary-700"
              onClick={deleteEntry}
            >
              {phrases.Guestbook.delete}
            </button>
          )}
        </div>
        <div className="my-2">{entry.body}</div>
      </div>
    </div>
  );
};

export default GuestbookEntry;
