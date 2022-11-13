import { useEffect } from 'react';
import { BsEye } from 'react-icons/bs';
import useSWR from 'swr';

import fetcher from '@/lib/fetcher';

interface Props {
  slug: string;
  type: 'POST' | 'GET';
}

interface Views {
  total: number;
}

const ViewCounter = ({ slug, type = 'POST' }: Props) => {
  const { data } = useSWR<Views>(`/api/views/${slug}`, fetcher);
  const views = Number(data?.total ?? 0);

  useEffect(() => {
    type === 'POST' &&
      fetch(`/api/views/${slug}`, {
        method: 'POST',
      });
  }, [slug, type]);

  return views >= 0 ? (
    <div className="flex items-center gap-1.5">
      <BsEye size="1.2em" />
      {views}
    </div>
  ) : (
    <div className="h-full w-4 animate-pulse rounded-md bg-gray-200 dark:bg-gray-700" />
  );
};

export default ViewCounter;
