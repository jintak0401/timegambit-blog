'use client';

import { useState } from 'react';

import { IoEyeOutline, IoHeartOutline } from 'react-icons/io5';

import formattedDate from '@/lib/formattedDate';
import { usePostLikes } from '@/hooks/use-post-likes';
import usePostViews from '@/hooks/usePostViews';

import NavLink from '@/components/common/nav-link';
import ImageWithFallback from '@/components/image/image-with-fallback';

import { PostListItem } from '@/types';

import Tag from './Tag';

interface Props {
  post: PostListItem;
}

const Counter = ({ slug }: { slug: string }) => {
  const {
    postLikes,
    isLoading: likeLoading,
    isError: likeError,
  } = usePostLikes(slug);
  const {
    viewCount,
    isLoading: viewLoading,
    isError: viewError,
  } = usePostViews(slug);

  if (likeLoading || viewLoading) {
    return (
      <div className="h-5 w-28 animate-pulse rounded-md bg-gray-200 dark:bg-gray-700" />
    );
  } else if (likeError && viewError) {
    return null;
  }

  return (
    <>
      <dt className="sr-only">Separator</dt>
      <dd>-</dd>
      {!viewError && (
        <>
          <dt className="sr-only">View Count</dt>
          <dd className="flex items-center gap-1.5">
            <IoEyeOutline size="1.2em" />
            {viewCount}
          </dd>
        </>
      )}
      {!likeError && postLikes !== 0 && (
        <>
          <dt className="sr-only">Like Count</dt>
          <dd className="flex items-center gap-1.5">
            <IoHeartOutline size="1.2em" />
            {postLikes}
          </dd>
        </>
      )}
    </>
  );
};

const PostCard = ({ post }: Props) => {
  const { title, summary, tags, images, slug, date } = post;
  const [loading, setLoading] = useState(true);

  return (
    <div className="strong-text box-border max-w-full gap-4 space-y-2 rounded-md p-3 duration-300 hover:bg-gray-200 dark:hover:bg-gray-800 md:grid md:grid-cols-5 md:items-center md:space-y-0 xl:grid-cols-3">
      <NavLink
        href={`/blog/${slug}`}
        className="relative md:col-span-2 xl:col-span-1"
      >
        <ImageWithFallback
          alt={title}
          src={images[0]}
          className="aspect-[191/100] rounded-md object-cover"
          loading="lazy"
          onLoadingComplete={() => setLoading(false)}
        />
        <div
          className={`placeholder absolute left-0 top-1/2 my-auto aspect-[191/101] w-full -translate-y-1/2 overflow-hidden rounded-md bg-gray-200 dark:bg-gray-700 ${
            loading ? 'block' : 'hidden'
          }`}
        />
      </NavLink>
      <div className="flex flex-col justify-between gap-4 md:col-span-3 md:h-full xl:col-span-2">
        <div className="space-y-2 md:space-y-1">
          <NavLink href={`/blog/${slug}`}>
            <h2 className="w-fit cursor-pointer text-start text-xl font-bold leading-8 tracking-tight hover:text-primary-500 xl:text-2xl">
              {title}
            </h2>
          </NavLink>
          <ul className="flex flex-wrap">
            {tags &&
              tags.map((tag) => (
                <li key={tag}>
                  <Tag text={tag} />
                </li>
              ))}
          </ul>
          <p>{summary}</p>
        </div>
        <dl className="middle-text flex items-center gap-2 font-medium">
          <dt className="sr-only">Creation Date</dt>
          <dd>
            <time dateTime={date}>{formattedDate(date)}</time>
          </dd>
          <Counter slug={slug} />
        </dl>
      </div>
    </div>
  );
};

export default PostCard;
