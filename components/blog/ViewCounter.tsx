import { useEffect } from 'react';
import { IoEyeOutline } from 'react-icons/io5';

import usePostViews from '@/hooks/usePostViews';

interface Props {
  slug: string;
  shown?: boolean;
  type?: 'POST' | 'GET';
}

const LAST_POST = 'lastPost';

const ViewCounter = ({ slug, type = 'POST', shown = false }: Props) => {
  const { viewCount, isLoading, isError, increment } = usePostViews(slug);

  useEffect(() => {
    if (type === 'GET' || localStorage.getItem(LAST_POST) === slug) return;

    localStorage.setItem(LAST_POST, slug);

    increment();
  }, []);

  // when no need to show & fetching is error
  if (!shown || isError) return null;
  // loading
  else if (isLoading)
    return (
      <div className="h-5 w-12 animate-pulse rounded-md bg-gray-200 dark:bg-gray-700" />
    );
  // success for fetching
  else
    return (
      <div className="flex items-center gap-1.5">
        <IoEyeOutline size="1.2em" />
        {viewCount}
      </div>
    );
};

export default ViewCounter;
