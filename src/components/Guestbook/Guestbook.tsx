import phrases from 'data/phrases';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

import { UserType } from '@/lib/types';

import Spinner from '@/components/common/Spinner';

import GuestbookInput from './GuestbookInput';
import GuestbookLogin from './GuestbookLogin';

const Guestbook = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  return (
    <div className="strong-text space-y-6 rounded-md border-2 p-4 md:p-10">
      <header className="flex items-center justify-start gap-4">
        <h2 className="text-2xl font-semibold md:text-3xl">
          {session
            ? phrases.Guestbook.messageGuestbook
            : phrases.Guestbook.loginGuestbook}
        </h2>
        {loading && <Spinner />}
      </header>
      {session?.user ? (
        <GuestbookInput
          user={session.user as UserType}
          setLoading={setLoading}
        />
      ) : (
        <GuestbookLogin setLoading={setLoading} />
      )}
    </div>
  );
};

export default Guestbook;
