import Link from 'next/link';

import formattedDate from '@/lib/formattedDate';
import { PostListItem } from '@/lib/types';

import ViewCounter from '@/components/blog/ViewCounter';
import ImageWithFallback from '@/components/Image/ImageWithFallback';
import Tag from '@/components/Tag';

interface Props {
  post: PostListItem;
}

const PostCard = ({ post }: Props) => {
  const { title, summary, tags, images, slug, date } = post;
  return (
    <article
      className="basic-text box-border max-w-full gap-4 space-y-2 rounded-md p-3 duration-300
     hover:bg-gray-100 dark:hover:bg-gray-800 md:grid md:grid-cols-5 md:items-center md:space-y-0 xl:grid-cols-3"
    >
      <Link href={`/blog/${slug}`} className="md:col-span-2 xl:col-span-1">
        <ImageWithFallback
          alt={title}
          src={images[0]}
          className="rounded-md object-cover"
          width="1692"
          height="1000"
          loading="lazy"
        />
      </Link>
      <div className="flex flex-col justify-between gap-4 md:col-span-3 md:h-full xl:col-span-2">
        <div className="space-y-2">
          <Link href={`/blog/${slug}`}>
            <h3 className="w-fit cursor-pointer text-start text-xl font-bold leading-8 tracking-tight hover:text-primary-500 xl:text-2xl">
              {title}
            </h3>
          </Link>
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
        <dl className="flex gap-2 text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
          <dt className="sr-only">작성 날짜</dt>
          <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
            <time dateTime={date}>{formattedDate(date)}</time>
          </dd>
          <p className="bold">-</p>
          <dt className="sr-only">조회수</dt>
          <dd>
            <ViewCounter slug={slug} type={'GET'} shown={true} />
          </dd>
        </dl>
      </div>
    </article>
  );
};

export default PostCard;
