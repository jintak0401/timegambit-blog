import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const BsEye = dynamic(() => import('react-icons/bs').then((res) => res.BsEye));

interface Props {
  slug: string;
  shown?: boolean;
  type?: 'POST' | 'GET';
}

interface Views {
  viewCount: number;
}

const LAST_POST = 'lastPost';

const ViewCounter = ({ slug, type = 'POST', shown = false }: Props) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (type === 'POST' && localStorage.getItem(LAST_POST) === slug) return;

    type === 'POST' && localStorage.setItem(LAST_POST, slug);

    const fetching = fetch(`/api/views/${slug}`, {
      method: type,
    });
    if (shown) {
      fetching
        .then((res) => res.json())
        .then(({ viewCount }: Views) => setCount(viewCount))
        .catch(() => setCount(-1));
    }
  }, [slug, type, shown]);

  // when no need to show & fetching is error
  if (!shown || count === -1) return null;
  // loading
  else if (count === 0)
    return (
      <div className="h-5 w-12 animate-pulse rounded-md bg-gray-200 dark:bg-gray-700" />
    );
  // success for fetching
  else
    return (
      <div className="flex items-center gap-1.5">
        <BsEye size="1.2em" />
        {count}
      </div>
    );
};

export default ViewCounter;
