import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { useRef } from 'react';
import { toast } from 'react-toastify';
import { mutate } from 'swr';

import { UserType } from '@/lib/types';

import phrases from '@/data/phrases';

interface Props {
  user: UserType;
}

const GuestbookInput = ({ user }: Props) => {
  const ref = useRef<HTMLInputElement | null>(null);

  const onSubmitEntry = async () => {
    const res = await fetch('/api/guestbook', {
      body: JSON.stringify({ body: ref.current?.value }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    });

    const { error } = await res.json();

    if (error) {
      toast(phrases.Guestbook.errorSubmit, {
        type: 'error',
      });
      return;
    }

    mutate('/api/guestbook');
    toast(phrases.Guestbook.successSubmit, { type: 'success' });
    ref.current && (ref.current.value = '');
  };

  return (
    <>
      <label className="strong-text block text-lg after:text-red-500 after:content-['*'] dark:after:text-red-400">
        메시지
      </label>
      <form
        className="!mt-1 flex flex-col items-center justify-between gap-5 sm:flex-row"
        title={phrases.Guestbook.messageInputTitle}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitEntry();
        }}
      >
        <input
          className="w-full rounded-md border px-3 py-1 text-lg duration-500 focus:border-primary-500 focus:outline-0 sm:flex-1"
          ref={ref}
          minLength={1}
          maxLength={500}
          placeholder={phrases.Guestbook.placeholder}
          required
        />
        <button
          type="submit"
          className="w-full rounded-md bg-primary-200 py-2 dark:bg-primary-700 sm:w-24"
        >
          {phrases.Guestbook.submitMessage}
        </button>
      </form>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={user.image}
            alt="프로필 사진"
            className="rounded-full"
            loading="lazy"
            width="50"
            height="50"
            objectFit="cover"
          />
          <div className="strong-text text-lg font-medium">{user.name}</div>
        </div>
        <button
          className="w-24 rounded-md bg-primary-200 py-2 dark:bg-primary-700"
          onClick={() => signOut()}
        >
          {phrases.Guestbook.logout}
        </button>
      </div>
    </>
  );
};

export default GuestbookInput;
