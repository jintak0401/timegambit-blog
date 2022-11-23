import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';

interface Props {
  session: Session;
}

const GuestbookInput = ({ session }: Props) => {
  return (
    <div>
      <button
        className="rounded-md bg-primary-200 px-6 py-4"
        onClick={() => signOut()}
      >
        로그아웃
      </button>
    </div>
  );
};

export default GuestbookInput;
