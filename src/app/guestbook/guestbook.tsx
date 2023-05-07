'use client';

import { useState } from 'react';

import phrases from 'data/phrases';

import { DefaultSession } from 'next-auth';

import { UserType } from '@/lib/types';

import Spinner from '@/components/common/Spinner';

import GuestbookForm from './form';
import GuestbookLogin from './login';

interface Props {
  user: DefaultSession['user'];
}

const Guestbook = ({ user }: Props) => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="strong-text space-y-6 rounded-md border-2 p-4 md:px-10 md:py-6">
      <header className="flex items-center justify-start gap-4">
        <h2 className="text-2xl font-semibold md:text-3xl">
          {user
            ? phrases.Guestbook.messageGuestbook
            : phrases.Guestbook.loginGuestbook}
        </h2>
        {loading && <Spinner />}
      </header>
      {user ? (
        <GuestbookForm user={user as UserType} setLoading={setLoading} />
      ) : (
        <GuestbookLogin setLoading={setLoading} />
      )}
    </div>
  );
};

export default Guestbook;
