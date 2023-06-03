import { useRef } from 'react';
import NextImage from 'next/image';

import phrases from 'data/phrases';

import { signOut } from 'next-auth/react';
import { toast } from 'react-toastify';
import { mutate } from 'swr';

import { UserType } from '@/types';

interface Props {
  user: UserType;
  setLoading: (loading: boolean) => void;
}

const GuestbookForm = ({ setLoading, user }: Props) => {
  const ref = useRef<HTMLInputElement | null>(null);

  const onSubmitEntry = async () => {
    setLoading(true);

    const res = await fetch('/api/guestbook', {
      body: JSON.stringify({ body: ref.current?.value }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    });

    setLoading(false);

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
          className="duration-default strong-text w-full rounded-md border border-gray-300 bg-white px-3 py-1 text-lg focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 sm:flex-1"
          type="text"
          ref={ref}
          minLength={1}
          maxLength={500}
          placeholder={phrases.Guestbook.placeholder}
          required
        />
        <button
          type="submit"
          className="duration-default button-color w-full rounded-md py-2 font-semibold sm:w-24"
        >
          {phrases.Guestbook.submitMessage}
        </button>
      </form>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <NextImage
            src={user.image}
            alt="profile image"
            className="h-12 w-12 rounded-full object-cover"
            width="50"
            height="50"
          />
          <div className="strong-text w-36 truncate text-lg sm:w-96">
            {user.name}
          </div>
        </div>
        <button
          className="duration-default button-color w-24 rounded-md py-2 font-semibold"
          onClick={() => {
            setLoading(true);
            signOut().catch(() => setLoading(false));
          }}
        >
          {phrases.Guestbook.logout}
        </button>
      </div>
    </>
  );
};

export default GuestbookForm;
