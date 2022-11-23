import Image from 'next/image';
import { Session } from 'next-auth';
import { toast } from 'react-toastify';
import { useSWRConfig } from 'swr';

import { GuestbookEntryType } from '@/lib/types';
import useFormattedDate from '@/hooks/useFormattedDate';

interface Props {
  entry: GuestbookEntryType;
  session: Session | null;
}

const GuestbookEntry = ({ entry, session }: Props) => {
  const { mutate } = useSWRConfig();

  const deleteEntry = async () => {
    try {
      await fetch(`/api/guestbook/${entry.id}`, {
        method: 'DELETE',
      });
    } catch (e) {
      toast('삭제에 실패했습니다.');
    }
  };

  return (
    <div className="flex gap-6 rounded-md border px-6 py-4">
      <Image
        src={entry.image}
        alt="프로필 사진"
        className="rounded-full"
        loading="lazy"
        width="40"
        height="40"
        objectFit="contain"
      />
      <div className="flex-1">
        <div>{entry.name}</div>
        <div className="weak-text">{useFormattedDate(entry.updated_at)}</div>
        <div className="my-2">{entry.body}</div>
      </div>
    </div>
  );
};

export default GuestbookEntry;
