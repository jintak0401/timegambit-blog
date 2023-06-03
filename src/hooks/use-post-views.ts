import useSWR, { SWRConfiguration } from 'swr';

const API_URL = `/api/views`;
const DEDUPING_INTERVAL = 60000;

const getPostViews = async (slug: string): Promise<{ viewCount: number }> => {
  const res = await fetch(`${API_URL}/${slug}`);
  if (!res.ok) {
    throw new Error(
      'An error occurred while fetching the data. [usePostViews]'
    );
  }
  return res.json();
};

const updatePostViews = async (
  slug: string
): Promise<{ viewCount: number }> => {
  const res = await fetch(`${API_URL}/${slug}`, { method: 'POST' });
  if (!res.ok) {
    throw new Error('An error occurred while posting the data. [usePostViews]');
  }
  return res.json();
};

const usePostViews = (slug: string, config?: SWRConfiguration) => {
  const { data, error, mutate } = useSWR<{ viewCount: number }>(
    [API_URL, slug],
    () => getPostViews(slug),
    {
      dedupingInterval: DEDUPING_INTERVAL,
      ...config,
    }
  );

  const increment = () => {
    mutate(
      updatePostViews(slug).catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e);
        return { viewCount: 0 };
      })
    );
  };

  return {
    viewCount: data?.viewCount,
    isLoading: !error && !data,
    isError: !!error,
    increment,
  };
};

export default usePostViews;
