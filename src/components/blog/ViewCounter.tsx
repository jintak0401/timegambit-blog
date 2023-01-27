import siteMetadata from 'data/siteMetadata.mjs';
import { useEffect } from 'react';

import usePostViews from '@/hooks/usePostViews';

interface Props {
  slug: string;
}

const LAST_POST = 'last-post';

const LIMIT_TIME =
  (siteMetadata.blogPost.viewCountTimeLimit || 0) * 60 * 60 * 1000;

const ViewCounter = ({ slug }: Props) => {
  const { increment } = usePostViews(slug);

  useEffect(() => {
    const { slug: storageSlug, date: storageDate } = JSON.parse(
      localStorage.getItem(LAST_POST) || '{}'
    );

    if (
      storageSlug === slug &&
      storageDate &&
      Number(new Date()) - Number(new Date(storageDate)) < LIMIT_TIME
    )
      return;

    localStorage.setItem(LAST_POST, JSON.stringify({ slug, date: new Date() }));

    increment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return null;
};

export default ViewCounter;
