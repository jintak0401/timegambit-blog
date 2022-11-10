import { useEffect, useState } from 'react';
import { BsEye } from 'react-icons/bs';

interface Props {
  slug: string;
  shown?: boolean;
  type?: 'POST' | 'GET';
}

interface Views {
  viewCount: number;
}

const ViewCounter = ({ slug, type = 'POST', shown = false }: Props) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetching = fetch(`/api/views/${slug}`, {
      method: type,
    });
    if (type === 'GET') {
      fetching
        .then((res) => res.json())
        .then(({ viewCount }: Views) => setCount(viewCount));
    }
  }, [slug, type]);

  if (shown) {
    return count > 0 ? (
      <div className="flex items-center gap-1.5">
        <BsEye size="1.2em" />
        {count}
      </div>
    ) : (
      <div className="h-5 w-12 animate-pulse rounded-md bg-gray-200 dark:bg-gray-700" />
    );
  } else return null;
};

export default ViewCounter;
