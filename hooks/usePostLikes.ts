import { useState } from 'react';
import useSWR, { SWRConfiguration } from 'swr';

import useDebounce from '@/hooks/useDebounce';

import siteMetadata from '@/data/siteMetadata';

const API_URL = `/api/likes`;
const DEDUPING_INTERVAL = 60000;

interface PostLikesType {
  userLikes: number;
  postLikes: number;
}

const getLikes = async (slug: string): Promise<PostLikesType> => {
  const res = await fetch(`${API_URL}/${slug}`);
  if (!res.ok) {
    throw new Error(
      'An error occurred while fetching the data. [usePostLikes]'
    );
  }
  return res.json();
};

const updateLikes = async (
  slug: string,
  count: number
): Promise<PostLikesType> => {
  const res = await fetch(`${API_URL}/${slug}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ count }),
  });
  if (!res.ok) {
    throw new Error('An error occurred while posting the data. [usePostLikes]');
  }
  return res.json();
};

export const usePostLikes = (slug: string, config?: SWRConfiguration) => {
  const { data, error, mutate } = useSWR(
    [API_URL, slug],
    () => getLikes(slug),
    {
      dedupingInterval: DEDUPING_INTERVAL,
      ...config,
    }
  );

  const [batchedLikes, setBatchedLikes] = useState(0);

  const increment = () => {
    if (!data || data.userLikes >= siteMetadata.blogPost.maxLikeCount) {
      return;
    }

    mutate(
      {
        postLikes: data.postLikes + 1,
        userLikes: data.userLikes + 1,
      },
      false
    );

    setBatchedLikes(batchedLikes + 1);
  };

  useDebounce(
    () => {
      if (batchedLikes === 0) return;

      mutate(updateLikes(slug, batchedLikes));
      setBatchedLikes(0);
    },
    1000,
    [batchedLikes]
  );

  return {
    userLikes: data?.userLikes,
    postLikes: data?.postLikes,
    isLoading: !error && !data,
    isError: !!error,
    increment,
  };
};
