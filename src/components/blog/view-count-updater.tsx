'use client';

import { useEffect } from 'react';

import siteMetadata from 'data/siteMetadata.mjs';

import usePostViews from '@/hooks/use-post-views';

interface Props {
  slug: string;
}

const LAST_POST = 'last-post';

const LIMIT_TIME =
  (siteMetadata.blogPost.viewCountTimeLimit || 0) * 60 * 60 * 1000;

const ViewCountUpdater = ({ slug }: Props) => {
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

export default ViewCountUpdater;
