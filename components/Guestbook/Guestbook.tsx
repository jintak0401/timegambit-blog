import { useSession } from 'next-auth/react';

import { UserType } from '@/lib/types';

import phrases from '@/data/phrases';

import GuestbookInput from '@/components/Guestbook/GuestbookInput';
import GuestbookLogin from '@/components/Guestbook/GuestbookLogin';

const Guestbook = () => {
  const { data: session } = useSession();

  return (
    <div className="strong-text space-y-6 rounded-md border-2 p-4 md:p-10">
      <h2 className="text-2xl font-semibold md:text-3xl">
        {session
          ? phrases.Guestbook.messageGuestbook
          : phrases.Guestbook.loginGuestbook}
      </h2>
      {session?.user ? (
        <GuestbookInput user={session.user as UserType} />
      ) : (
        <GuestbookLogin />
      )}
    </div>
  );
};

export default Guestbook;
