import Link from 'next/link';

import formatDate from '@/lib/formatDate';
import { PostListItem } from '@/lib/types';

import Tag from '@/components/Tag';
import ViewCounter from '@/components/ViewCounter';

import Image from './Image';

interface Props {
  post: PostListItem;
}

const PostCard = ({ post }: Props) => {
  const { title, summary, tags, images, slug, date } = post;
  return (
    <article className="basic-text my-10 box-border max-w-full gap-4 space-y-2 duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 xl:grid xl:grid-cols-3 xl:items-center xl:space-y-0">
      <Link href={`/blog/${slug}`}>
        <a>
          <Image
            alt={title}
            src={images[0]}
            className="rounded-md object-cover"
            placeholder="blur"
            blurDataURL={`/_next/image?url=/static/images/blog/${images[0]}&w=16&q=1`}
            layout="responsive"
            width={16}
            height={9}
          />
        </a>
      </Link>
      <div className="flex flex-col justify-between gap-4 xl:col-span-2 xl:h-full">
        <div className="space-y-2">
          <Link href={`/blog/${slug}`}>
            <a>
              <h3 className="w-fit cursor-pointer text-start text-2xl font-bold leading-8 tracking-tight hover:text-primary-500">
                {title}
              </h3>
            </a>
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
            <time dateTime={date}>{formatDate(date)}</time>
          </dd>
          <p className="bold">-</p>
          <dt className="sr-only">조회수</dt>
          <dd>
            <ViewCounter slug={slug} type={'GET'} />
          </dd>
        </dl>
      </div>
    </article>
  );
};

export default PostCard;
